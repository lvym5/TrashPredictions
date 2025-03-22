import React, { useState, useEffect } from "react";
import axios from "axios";
import Plot from "react-plotly.js";

function Analytics() {
  const [trashData, setTrashData] = useState([]);
  const [sortDesc, setSortDesc] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://vmya5xaguym4xlqfqhethh75wa0hnkrq.lambda-url.us-east-2.on.aws/"
        );
        const sortedData = res.data.sort((a, b) =>
          sortDesc ? b.value - a.value : a.value - b.value
        );
        setTrashData(sortedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [sortDesc]);

  const data = [
    {
      x: trashData.map((item) => item.created_at),
      y: trashData.map((item) => item.value),
      type: "scatter",
      mode: "markers",
      marker: {
        color: trashData.map((item) => item.sensor_id.toString()), // Convert to string for categorical mapping
        colorscale: "Category10",
      },
    },
  ];

  const layout = {
    title: "Trash Data Visualization",
    xaxis: { title: "Timestamp" },
    yaxis: { title: "Sensor Value" },
  };

  return (
    <div>
      <h1>Trash Data</h1>
      <button onClick={() => setSortDesc(!sortDesc)}>
        Sort {sortDesc ? "Ascending" : "Descending"}
      </button>
      <Plot data={data} layout={layout} />
      <NeuralNetwork />
    </div>
  );
}

function NeuralNetwork() {
  const [selectedSensor, setSelectedSensor] = useState("");
  const [prediction, setPrediction] = useState(null);

  const options = ["2", "3", "4", "5", "6", "7", "8", "9", "10"];

  const handleSelectionChange = (event) => {
    setSelectedSensor(event.target.value);
  };

  const handleSubmit = async () => {
    if (!selectedSensor) {
      alert("Select a sensor before submitting");
      return;
    }

    const requestData = {
      selected_data: selectedSensor,
      timestamp: new Date().toISOString(),
    };

    try {
      const response = await axios.post("", requestData);
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error("Error calling neural net:", error);
    }
  };

  return (
    <div>
      <h1>Neural Network Prediction</h1>

      <select value={selectedSensor} onChange={handleSelectionChange}>
        <option value="">Select a sensor</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>

      <button onClick={handleSubmit}>Submit</button>

      {prediction && <div>Prediction: {prediction}</div>}
    </div>
  );
}

export default Analytics;
