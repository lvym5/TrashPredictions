import React from "react";
import Plot from "react-plotly.js";

function Analytics() {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Analytics</h1>
            <div className="space-y-8">
                {/* Daily Average Trash Fullness */}
                <div className="bg-white p-4 shadow rounded">
                    <h2 className="text-xl font-bold mb-2">Daily Average Trash Fullness</h2>
                    <Plot
                        data={[
                            {
                                x: ['2025-03-16', '2025-03-17', '2025-03-18', '2025-03-19', '2025-03-20'],
                                y: [30, 45, 50, 40, 55],
                                type: 'scatter',
                                mode: 'lines+markers',
                                marker: { color: 'blue' },
                            },
                        ]}
                        layout={{
                            width: 600,
                            height: 400,
                            title: 'Daily Average Trash Fullness (%)',
                        }}
                    />
                </div>

                {/* Ranking of Trash Clearings */}
                <div className="bg-white p-4 shadow rounded">
                    <h2 className="text-xl font-bold mb-2">Ranking of Trash Clearings</h2>
                    <Plot
                        data={[
                            {
                                x: ['Building A', 'Building B', 'Building C', 'Building D'],
                                y: [5, 8, 2, 10],
                                type: 'bar',
                                marker: { color: 'green' },
                            },
                        ]}
                        layout={{
                            width: 600,
                            height: 400,
                            title: 'Number of Trash Clearings by Building',
                        }}
                    />
                </div>


            </div>
        </div>
    );
}

export default Analytics;
