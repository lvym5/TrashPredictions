import React from 'react';

export default function Sidebar({
  selectedBuilding,
  selectedFloor,
  onBuildingChange,
  onFloorChange,
  buildings,
  floors,
}) {
  return (
    <aside className="w-64 bg-white border-r-2 border-gray-300 p-3 shadow-sm overflow-y-auto">
      <h2 className="text-lg font-bold text-emerald-700 mb-2 px-1">📍 Select a Building</h2>

      <div className="space-y-1">
        {buildings.map((building) => {
          const isActive = selectedBuilding === building;

          return (
            <div
              key={building}
              className="bg-green-700 text-white rounded-md shadow-sm overflow-hidden"
            >
              <button
                onClick={() =>
                  onBuildingChange(isActive ? '' : building) // collapse if clicked again
                }
                className="w-full text-left px-4 py-2 font-medium hover:bg-green-800 transition"
              >
                {building}
              </button>

              {/* Expanded floor list */}
              {isActive && (
                <div className="bg-gray-50 text-sm text-blue-700 space-y-1 px-2 py-2 border-t border-green-800">
                  {floors.map((floor) => (
                    <button
                      key={floor}
                      onClick={() => onFloorChange(floor)}
                      className={`block w-full text-left px-3 py-1.5 rounded border text-sm ${
                        selectedFloor === floor
                          ? 'bg-cyan-500 text-white border-cyan-600'
                          : 'bg-white hover:bg-gray-100 border-gray-200'
                      }`}
                    >
                      {floor}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}
