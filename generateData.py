'''
import pandas as pd
import numpy as np

# Set random seed for reproducibility
np.random.seed(42)

# Generate 2000 rows of data
num_rows = 1000

sensor_ids = range(2,11)
for sensor_id in [2,10]:
# Generate timestamps within a range
    timestamps = pd.date_range(start="2024-01-01", periods=num_rows, freq="15min")

    # Generate random values in cm (e.g., between 0 and 200 cm)
    values = np.random.uniform(0, 100, num_rows)

    # Generate random battery levels (e.g., between 0 and 100%)
    battery_levels = np.random.uniform(0, 100, num_rows)

    # Generate random signal strength (e.g., between -100 and 0 dBm)
    signal_strengths = np.random.uniform(-100, 0, num_rows)


    # Create a DataFrame
    df = pd.DataFrame({
        "timestamp": timestamps,
        "sensor_id": sensor_ids,
        "value_cm": values,
        "battery_level": battery_levels,
        "signal_strength": signal_strengths
    })

# Define meal times where values should be lower
    def adjust_values_based_on_time(timestamp, value):
        hour = timestamp.hour
        if (7 <= hour < 9) or (12 <= hour < 14) or (18 <= hour < 20):  # Meal times
            return value * 0.5  # Reduce values by 50%
        return value

# Apply the adjustment to values
    df["value_cm"] = df.apply(lambda row: adjust_values_based_on_time(row["timestamp"], row["value_cm"]), axis=1)

# Display first few rows after adjustment
df.head()

print(df)
'''


import pandas as pd
import numpy as np
import matplotlib as plt
import plotly.express as px

# Define parameters
sensor_ids = range(2, 11)  # IDs from 2 to 10
num_rows_per_sensor = 10000  # Adjust this to get a total of ~2000 rows
timestamps = pd.date_range(start="2022-01-01", periods=num_rows_per_sensor, freq="15min")

# Function to adjust values based on meal times
def adjust_values_based_on_time(timestamp, value):
    if timestamp.hour in range(7, 9) or timestamp.hour in range(12, 14) or timestamp.hour in range(18, 20):
        return value * 0.5  # Reduce by 50% during meal times
    return value

# Create an empty list to store data
data = []

# Loop through each sensor and generate rows
for sensor_id in sensor_ids:
    for timestamp in timestamps:
        value_cm = np.random.uniform(0, 100)
        adjusted_value = adjust_values_based_on_time(timestamp, value_cm)
        battery_level = np.random.uniform(0, 100)
        signal_strength = np.random.uniform(-100, 0)

        # Append to list
        data.append([timestamp, sensor_id, adjusted_value, battery_level, signal_strength])

# Convert to DataFrame
df = pd.DataFrame(data, columns=["timestamp", "sensor_id", "value_cm", "battery_level", "signal_strength"])

df.to_csv("sensor_data.csv", index=False)
