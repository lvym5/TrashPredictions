import React, { useEffect, useState } from "react";
import axios from "axios";

const SENSOR_META = {
    96: { building: "Hekman Library", floor: "3rd Floor" },
    55: { building: "Science Hall", floor: "1st Floor" },
    29: { building: "Commons Hall", floor: "Basement" },
    21: { building: "Dining Center", floor: "2nd Floor" },
    64: { building: "Hekman Library", floor: "2nd Floor" },
    57: { building: "Commons Hall", floor: "3rd Floor" },
    99: { building: "Science Hall", floor: "Basement" },
    91: { building: "Dining Center", floor: "3rd Floor" },
    // Add more mappings as needed
};

const getSensorLocation = (id) => SENSOR_META[id] || { building: "Unknown", floor: "-" };

const getColor = (value) => {
    if (value >= 70) return "bg-red-500";
    if (value >= 40) return "bg-yellow-400";
    return "bg-green-500";
};

export default function Trashlist() {
    const [trashData, setTrashData] = useState([]);
    const [sortDesc, setSortDesc] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(
                "https://vmya5xaguym4xlqfqhethh75wa0hnkrq.lambda-url.us-east-2.on.aws/"
            );
            setTrashData(res.data);
        };
        fetchData();
    }, []);

    const sortedData = [...trashData].sort((a, b) =>
        sortDesc ? b.value - a.value : a.value - b.value
    );

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold text-gray-800">Trash Can List</h1>
                <button
                    onClick={() => setSortDesc((prev) => !prev)}
                    className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 shadow"
                >
                    Sort by Value {sortDesc ? "↓" : "↑"}
                </button>
            </div>

            <div className="overflow-auto rounded shadow border border-gray-200">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-100 text-gray-600 font-semibold">
                        <tr>
                            <th className="px-4 py-2">Sensor ID</th>
                            <th className="px-4 py-2">Value (%)</th>
                            <th className="px-4 py-2">Battery</th>
                            <th className="px-4 py-2">Signal</th>
                            <th className="px-4 py-2">Building</th>
                            <th className="px-4 py-2">Floor</th>
                            <th className="px-4 py-2">Timestamp</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedData.map((can) => {
                            const location = getSensorLocation(can.sensor_id);
                            return (
                                <tr key={can.transaction_id} className="border-t hover:bg-gray-50">
                                    <td className="px-4 py-2 text-center">{can.sensor_id}</td>
                                    <td className="px-4 py-2 text-center">
                                        <span
                                            className={`inline-block w-4 h-4 rounded-full mr-2 ${getColor(can.value)}`}
                                        ></span>
                                        {can.value}%
                                    </td>
                                    <td className="px-4 py-2 text-center">{can.battery_level}%</td>
                                    <td className="px-4 py-2 text-center">{can.signal_strength}</td>
                                    <td className="px-4 py-2 text-center">{location.building}</td>
                                    <td className="px-4 py-2 text-center">{location.floor}</td>
                                    <td className="px-4 py-2 text-sm text-gray-500">
                                        {new Date(can.created_at).toLocaleString()}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}