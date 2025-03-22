import React from 'react';
import TabBar from '../components/TabBar';

const TRASH_CANS = [
  { id: 1, x: 30, y: 50, level: 'low' },
  { id: 2, x: 60, y: 70, level: 'mid' },
  { id: 3, x: 45, y: 25, level: 'high' },
];

const levelColor = {
  low: 'bg-green-400',
  mid: 'bg-yellow-400',
  high: 'bg-red-500',
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
          <aside className="w-64 bg-white p-4 pr-6 border-r-2 border-gray-300 shadow-sm space-y-4">
            {/* Sidebar Header */}
            <div className="bg-red-800 text-white text-lg font-semibold px-3 py-2 rounded-t">
              {selectedBuilding || 'Select a Building'}
            </div>

            {/* Building block buttons */}
            {!selectedBuilding && (
              <div className="space-y-2">
                {buildings.map((building) => (
                  <button
                    key={building}
                    onClick={() => onBuildingChange(building)}
                    className="w-full bg-green-700 hover:bg-green-800 text-white font-medium py-2 px-4 rounded shadow"
                  >
                    {building}
                  </button>
                ))}
              </div>
            )}

            {/* Floor block buttons */}
            {selectedBuilding && (
              <div className="bg-gray-50 p-2 border border-gray-300 rounded-b space-y-2">
                {floors.map((floor) => (
                  <button
                    key={floor}
                    onClick={() => onFloorChange(floor)}
                    className={`block w-full text-left px-3 py-2 border rounded font-medium ${selectedFloor === floor
                        ? 'bg-cyan-500 text-white border-cyan-600'
                        : 'bg-white text-blue-600 border-gray-200 hover:bg-gray-100'
                      }`}
                  >
                    {floor}
                  </button>
                ))}

                {/* Change building button */}
                <button
                  onClick={() => onBuildingChange('')}
                  className="mt-3 text-sm text-gray-500 hover:text-red-600 underline"
                >
                  ← Change building
                </button>
              </div>
            )}
          </aside>

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
                  {/* Fill Level Bar */}
                  <div
                    className={`w-8 h-2 rounded ${levelColor[can.level]} mb-1 shadow-sm`}
                    title={`Fill level: ${can.level}`}
                  />
                  {/* Trash Icon */}
                  <div className="text-2xl" title={`Can ${can.id}`}>
                    🗑️
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
