import React from 'react';
import TabBar from '../components/TabBar';
import Sidebar from '../components/Sidebar';
import TrashIcon from '../assets/trashcan.png'; // Add a custom icon here

const TRASH_CANS = [
  { id: 1, x: 50, y: 50, value: 25 }, // Center
  { id: 2, x: 50, y: 15, value: 60 }, // Top
  { id: 3, x: 50, y: 85, value: 90 }, // Bottom
];

const getBarSegments = (value) => {
  return Array.from({ length: 6 }, (_, i) => {
    const filledBars = Math.round((value / 100) * 6);
    if (i < filledBars) {
      if (filledBars <= 2) return 'bg-green-500';
      if (filledBars <= 4) return 'bg-yellow-400';
      return 'bg-red-500';
    }
    return 'bg-gray-200';
  });
};

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
  const getImageFileName = (building, floor) => {
    if (!building || !floor) return '/map/hekman-library-3.png';
    const buildingKey = building.toLowerCase().replace(/\s+/g, '-');
    const floorKey = floor.toLowerCase().replace(/\s+/g, '-');
    return `/map/${buildingKey}-${floorKey}.png`;
  };

  const mapImage = getImageFileName(selectedBuilding, selectedFloor);

  return (
    <div className="flex flex-1 h-full ">
      <div className="flex flex-col w-full h-full p-4 bg-white shadow-inner rounded-md mx-4 my-4">
        {/* Tab Bar */}

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
            <h2 className="w-full text-left text-3xl font-bold text-gray-800 mb-4 pl-2">
              {selectedBuilding && selectedFloor
                ? `${selectedBuilding} – ${selectedFloor}`
                : '🗺️ Default Map View'}
            </h2>

            <div className="w-full h-5/6 relative border-4 border-dashed border-gray-300 bg-cyan-50 rounded-lg overflow-hidden">
              <img
                src={mapImage}
                alt="Floor Map"
                className="object-contain w-full h-full"
              />

              {/* Trash Can Icons */}
              {TRASH_CANS.map((can) => (
                <div
                  key={can.id}
                  className="absolute flex flex-col items-center"
                  style={{
                    top: `${can.y}%`,
                    left: `${can.x}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  {/* Fancy Horizontal Level Bar with 6 Segments */}
                  <div className="flex space-x-0.5 mb-1">
                    {getBarSegments(can.value).map((color, idx) => (
                      <div
                        key={idx}
                        className={`w-2 h-4 ${color} rounded-sm shadow-sm`}
                        title={`Segment ${idx + 1}`}
                      ></div>
                    ))}
                  </div>

                  {/* Trash Icon */}
                  <img
                    src={TrashIcon}
                    alt="Trash Can"
                    className="w-6 h-6"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
