import torch
import torch.nn as nn
import torch.optim as optim
import numpy as np
import pandas as pd
import matplotlib as plt
from sklearn.preprocessing import MinMaxScaler
from sklearn.model_selection import train_test_split
from torch.utils.data import DataLoader, TensorDataset

torch.set_num_threads(4)  # Set to the number of CPU cores you want to use


sensor = pd.read_csv("sensor_data.csv")

sensor['timestamp'] = pd.to_datetime(sensor['timestamp'])

sensor['hour'] = sensor['timestamp'].dt.hour
sensor['day_of_week'] = sensor['timestamp'].dt.dayofweek  # Monday=0, Sunday=6

sensor['sin_hour'] = np.sin(2 * np.pi * sensor['hour'] / 24)
sensor['cos_hour'] = np.cos(2 * np.pi * sensor['hour'] / 24)

# Cyclical encoding for 'day_of_week' (0-6)
sensor['sin_day_of_week'] = np.sin(2 * np.pi * sensor['day_of_week'] / 7)
sensor['cos_day_of_week'] = np.cos(2 * np.pi * sensor['day_of_week'] / 7)


# Drop the original timestamp column if it's no longer needed
sensor = sensor.drop(columns=["timestamp"])

# Assuming 'feature' is the feature column and 'target' is the target column
# Normalize the new features along with other features (if applicable)
scaler = MinMaxScaler(feature_range=(0, 1))
sensor_scaled = scaler.fit_transform(sensor)

# Separate features and target
features = sensor_scaled[:, :-1]  # Assuming the last column is the target
target = sensor_scaled[:, -1]  # Assuming the last column is the target

# Function to create sequences for the LSTM
def create_sequences(features, target, sequence_length=10):
    X, y = [], []
    for i in range(len(features) - sequence_length):
        X.append(features[i:i+sequence_length])  # Take the past `sequence_length` timesteps
        y.append(target[i+sequence_length])  # Predict the next value
    return np.array(X), np.array(y)

sequence_length = 10  # Length of the time sequence to look back
X, y = create_sequences(features, target, sequence_length)

# Reshape X for LSTM input (samples, timesteps, features)
X = X.reshape((X.shape[0], X.shape[1], X.shape[2]))

# Convert to PyTorch tensors
X_tensor = torch.tensor(X, dtype=torch.float32)
y_tensor = torch.tensor(y, dtype=torch.float32).view(-1, 1)

X_train, X_test, y_train, y_test = train_test_split(X_tensor, y_tensor, test_size=0.2, shuffle=False)

# Create DataLoader for batch training
train_dataset = TensorDataset(X_train, y_train)
test_dataset = TensorDataset(X_test, y_test)

train_loader = DataLoader(train_dataset, batch_size=32, shuffle=True)
test_loader = DataLoader(test_dataset, batch_size=32, shuffle=False)

class LSTMModel(nn.Module):
    def __init__(self, input_size, hidden_size, num_layers, output_size):
        super(LSTMModel, self).__init__()
        self.hidden_size = hidden_size
        self.num_layers = num_layers
        self.lstm = nn.LSTM(input_size, hidden_size, num_layers, batch_first=True)
        self.fc = nn.Linear(hidden_size, output_size)
        
    def forward(self,x):
        h0 = torch.zeros(self.num_layers, x.size(0), self.hidden_size).to(x.device)
        c0 = torch.zeros(self.num_layers, x.size(0), self.hidden_size).to(x.device) 
        out, _ = self.lstm(x, (h0, c0))
        out = self.fc(out[:, -1, :])
        return out

input_size = X_tensor.shape[2]  # Number of features (sin_hour, cos_hour, sin_day_of_week, cos_day_of_week)
hidden_size = 50
num_layers = 2
output_size = 1

model = LSTMModel(input_size, hidden_size, num_layers, output_size)
optimizer = optim.Adam(model.parameters(), lr = 0.001)
loss_fn = nn.MSELoss()

n_epochs = 200

for epoch in range(n_epochs):
    model.train()
    for X_batch, y_batch in train_loader:
        y_pred = model(X_batch)
        loss=  loss_fn(y_pred, y_batch)
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()
    if epoch % 100 != 0:
        continue
    model.eval()
    with torch.no_grad():
        y_pred = model(X_train)
        train_rmse = np.sqrt(loss_fn(y_pred, y_train))
        y_pred = model(X_test)
        test_rmse = np.sqrt(loss_fn(y_pred, y_test))
    print("Epoch %d: train RMSE %.4f, test RMSE %.4f" % (epoch, train_rmse, test_rmse))

#with torch.no_grad():
    