import React, { useEffect, useState } from "react";
import TabBar from "../components/TabBar";
import Sidebar from "../components/Sidebar";
import TrashIcon from "../assets/trashcan.png"; // Custom icon
import { DefaultMapIcon } from "../components/DefaultMapIcon";
import PdfPlaceholder from "../assets/calvin_map2.png";
import axios from "axios";

// Helper to generate bar segments (if you have a value to display)
const getBarSegments = (value) => {
  return Array.from({ length: 6 }, (_, i) => {
    const filledBars = Math.round((value / 100) * 6);
    if (i < filledBars) {
      if (filledBars <= 2) return "bg-green-500";
      if (filledBars <= 4) return "bg-yellow-400";
      return "bg-red-500";
    }
    return "bg-gray-200";
  });
};

// Convert a floor string (e.g. "1st Floor", "2nd Floor", "Ground Floor")
// to its numeric value (e.g. 1, 2, or 0 for ground)
function convertFloorStringToNumber(floorString) {
  if (!floorString) return null;
  if (floorString.toLowerCase().includes("ground")) {
    return 0;
  }
  const match = floorString.match(/^(\d+)/);
  return match ? parseInt(match[1], 10) : null;
}

// Normalize building names to match between API and UI
// If the API returns "SB", we want "Science Building" in the UI;
// if it returns "Hl", we want "Hekman Library"; otherwise, leave it as-is.
function normalizeBuilding(building) {
  if (!building) return "";
  const mapping = {
    "sb": "Science Building",
    "hl": "Hekman Library",
  };
  const lower = building.toLowerCase();
  return mapping[lower] || building;
}

export default function MapView({
  selectedBuilding,
  selectedFloor,
  onBuildingChange,
  onFloorChange,
  buildings,
  floors,
  activeTab,
  onTabChange,
}) {
  // State for dynamic trash data from API
  const [trashData, setTrashData] = useState([]);

  useEffect(() => {
    const fetchTrashData = async () => {
      try {
        const res = await axios.get(
          "https://vmya5xaguym4xlqfqhethh75wa0hnkrq.lambda-url.us-east-2.on.aws/"
        );
        setTrashData(res.data);
      } catch (error) {
        console.error("Error fetching trash data:", error);
      }
    };
    fetchTrashData();
  }, []);

  // Log API data for debugging
  console.log("API trash data:", trashData);

  // Get the map image for the selected building and floor
  const getImageFileName = (building, floor) => {
    if (!building || !floor) return PdfPlaceholder;
    const buildingKey = building.toLowerCase().replace(/\s+/g, "-");
    const floorKey = floor.toLowerCase().replace(/\s+/g, "-");
    return `/map/${buildingKey}-${floorKey}.png`;
  };

  const mapImage = getImageFileName(selectedBuilding, selectedFloor);

  // Normalize the selected building for comparison.
  const normalizedSelectedBuilding = normalizeBuilding(selectedBuilding);

  // Filter the trash data based on the normalized building and floor
  const filteredTrashData =
    selectedBuilding && selectedFloor
      ? trashData.filter(
        (item) =>
          normalizeBuilding(item.building) === normalizedSelectedBuilding &&
          item.floor_number === convertFloorStringToNumber(selectedFloor)
      )
      : [];

  // Log filtered data for debugging
  console.log(
    "Converted floor:",
    convertFloorStringToNumber(selectedFloor)
  );
  console.log("Filtered trash data:", filteredTrashData);

  return (
    <div className="flex flex-1 h-full">
      <div className="flex flex-col w-full h-full p-4 bg-white shadow-inner rounded-md mx-4 my-4">
        {/* Tab Bar (uncomment if needed) */}
        {/* <TabBar activeTab={activeTab} onTabChange={onTabChange} /> */}

        {/* Sidebar + Map Layout */}
        <div className="flex flex-1 overflow-hidden mt-4">
          {/* Sidebar */}
          <Sidebar
            selectedBuilding={selectedBuilding}
            selectedFloor={selectedFloor}
            onBuildingChange={onBuildingChange}
            onFloorChange={onFloorChange}
            buildings={buildings}
            floors={floors}
          />

          {/* Map Area */}
          <div className="flex-1 flex flex-col items-center justify-center relative px-4">
            <h2 className="text-[#03D069] font-tenor w-full text-left text-3xl font-bold text-gray-800 mb-3 pl-2">
              {selectedBuilding && selectedFloor
                ? `${normalizeBuilding(selectedBuilding)} – ${selectedFloor}`
                : "Calvin University"}
            </h2>

            <div className="w-full h-5/6 relative border-4 border-dashed border-gray-300 rounded-lg overflow-hidden">
              <img
                src={mapImage}
                alt="Floor Map"
                className="object-contain w-full h-full"
              />

              {/* Default Map View – Clickable Trash Icons */}
              {!selectedFloor && (
                <>
                  <DefaultMapIcon
                    topPosition="70%"
                    leftPosition="30%"
                    building="Hekman Library"
                    floor="2nd Floor"
                    TrashIcon={TrashIcon}
                    TRASH_CANS={trashData}
                    onBuildingChange={onBuildingChange}
                    onFloorChange={onFloorChange}
                  />
                  <DefaultMapIcon
                    topPosition="55%"
                    leftPosition="23%"
                    building="Science Building"
                    floor="Ground Floor"
                    TrashIcon={TrashIcon}
                    TRASH_CANS={trashData}
                    onBuildingChange={onBuildingChange}
                    onFloorChange={onFloorChange}
                  />
                  <DefaultMapIcon
                    topPosition="65%"
                    leftPosition="36%"
                    building="CFAC"
                    floor="1st Floor"
                    TrashIcon={TrashIcon}
                    TRASH_CANS={trashData}
                    onBuildingChange={onBuildingChange}
                    onFloorChange={onFloorChange}
                  />
                </>
              )}

              {/* Dynamic Trash Can Icons – Only show when a building and floor are selected */}
              {selectedBuilding &&
                selectedFloor &&
                filteredTrashData.map((item) => (
                  <div
                    key={item.id}
                    className="absolute flex flex-col items-center"
                    style={{
                      top: `${item.loc_y}%`,
                      left: `${item.loc_x}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <div className="bg-white rounded-sm p-1 flex space-x-0.5 mb-1 shadow">
                      {getBarSegments(Math.floor(Math.random() * 101)).map((color, idx) => (
                        <div
                          key={idx}
                          className={`w-2 h-4 ${color} rounded-sm shadow-sm`}
                          title={`Segment ${idx + 1}`}
                        ></div>
                      ))}
                    </div>
                    <div className="relative w-10 h-10">
                      <div className="absolute top-0 left-0 w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center shadow-md z-10">
                        <img
                          src={TrashIcon}
                          alt="Trash Can"
                          className="w-5 h-5"
                        />
                      </div>
                      <div className="absolute bottom-[-5px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[5px] border-r-[5px] border-t-[6px] border-l-transparent border-r-transparent border-t-gray-800 z-0" />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
