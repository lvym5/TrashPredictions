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

const getRoundedPercent = (can) => Math.ceil(parseFloat(can.percent_full) * 100);

const getColor = (percent) => {
    if (percent >= 70) return "bg-red-500";
    if (percent >= 40) return "bg-yellow-400";
    return "bg-green-500";
};

export default function Trashlist() {
    const [trashData, setTrashData] = useState([]);
    const [sortDesc, setSortDesc] = useState(true);
    const [filterBuilding, setFilterBuilding] = useState("All");
    const [filterValue, setFilterValue] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(
                "https://vmya5xaguym4xlqfqhethh75wa0hnkrq.lambda-url.us-east-2.on.aws/data/"
            );
            setTrashData(res.data);
        };
        fetchData();
    }, []);

    const filteredData = trashData.filter((can) => {
        const location = getSensorLocation(can.sensor_id);
        const percent = getRoundedPercent(can);
        const buildingMatch = filterBuilding === "All" || location.building === filterBuilding;
        const valueMatch = filterValue === "" || percent >= parseFloat(filterValue);
        return buildingMatch && valueMatch;
    });

    const sortedData = [...filteredData].sort((a, b) =>
        sortDesc
            ? getRoundedPercent(b) - getRoundedPercent(a)
            : getRoundedPercent(a) - getRoundedPercent(b)
    );

    const uniqueBuildings = Array.from(
        new Set(trashData.map((can) => getSensorLocation(can.sensor_id).building))
    );

    return (
        <div className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-between mb-4 space-y-2 md:space-y-0 md:space-x-4">
                <h1 className="font-tenor text-2xl font-bold text-gray-800">Trash Can List</h1>
                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => setSortDesc((prev) => !prev)}
                        className="font-tenor px-4 py-2 bg-[#03D069] text-white rounded hover:bg-emerald-700 shadow"
                    >
                        Sort by Value {sortDesc ? "↓" : "↑"}
                    </button>
                    <div className="flex items-center">
                        <label className="font-tenor mr-2" htmlFor="buildingFilter">
                            Building:
                        </label>
                        <select
                            id="buildingFilter"
                            value={filterBuilding}
                            onChange={(e) => setFilterBuilding(e.target.value)}
                            className="px-2 py-1 border rounded"
                        >
                            <option value="All">All</option>
                            {uniqueBuildings.map((building) => (
                                <option key={building} value={building}>
                                    {building}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex items-center">
                        <label htmlFor="valueFilter" className="font-tenor mr-2">
                            Min Value (%):
                        </label>
                        <input
                            id="valueFilter"
                            type="number"
                            value={filterValue}
                            onChange={(e) => setFilterValue(e.target.value)}
                            className="px-2 py-1 border rounded w-20"
                            placeholder="0"
                        />
                    </div>
                </div>
            </div>

            <div className="overflow-auto rounded shadow border border-gray-200">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-100 text-gray-600 font-semibold">
                        <tr>
                            <th className="font-tenor px-4 py-2">Sensor ID</th>
                            <th className="font-tenor px-4 py-2">Value (%)</th>
                            <th className="font-tenor px-4 py-2">Battery</th>
                            <th className="font-tenor px-4 py-2">Signal</th>
                            <th className="font-tenor px-4 py-2">Building</th>
                            <th className="font-tenor px-4 py-2">Floor</th>
                            <th className="font-tenor px-4 py-2">Timestamp</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedData.map((can) => {
                            const location = getSensorLocation(can.sensor_id);
                            const percent = getRoundedPercent(can);
                            return (
                                <tr key={can.transaction_id} className="border-t hover:bg-gray-50">
                                    <td className="px-4 py-2 text-center">{can.sensor_id}</td>
                                    <td className="px-4 py-2 text-center">
                                        <span
                                            className={`inline-block w-4 h-4 rounded-full mr-2 ${getColor(percent)}`}
                                        ></span>
                                        {percent}%
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
