import React from "react";

export default function Sidebar({
  selectedBuilding,
  selectedFloor,
  onBuildingChange,
  onFloorChange,
  buildings,
  floors,
}) {
  return (
    <aside className="w-64 p-3 overflow-y-auto">
      <div className="bg-white border border-gray-300  shadow-sm p-3">
        <button
          onClick={() => {
            onBuildingChange('');
            onFloorChange('');
          }}
          className=" text-[#03D069] font-tenor text-lg font-bol mb-4 px-1 hover:underline hover:text-emerald-900 transition"
        >
          Building
        </button>

        <div>
          {buildings.map((building) => {
            const isActive = selectedBuilding === building;

            return (
              <div key={building} className=" mb-1">
                <button
                  onClick={() => {
                    if (isActive) {
                      onBuildingChange('');
                      onFloorChange(floors[0]);
                    } else {
                      onBuildingChange(building);
                      if (floors && floors.length > 0) {
                        onFloorChange(floors[0]);
                      }
                    }
                  }}
                  className={`w-full text-left px-4 py-2 font-medium text-white  ${isActive
                    ? "bg-[#03D069]"
                    : "bg-[#03D069] hover:bg-green-800"
                    }`}
                >
                  {building}
                </button>

                {isActive && (
                  <div className="bg-gray-50 border border-[#03D069] px-2 py-2 ">
                    {floors.map((floor) => (
                      <button
                        key={floor}
                        onClick={() => onFloorChange(floor)}
                        className={`block w-full text-left px-3 py-1.5 border text-sm mb-1 ${selectedFloor === floor
                          ? "bg-cyan-500 text-white border-cyan-600"
                          : "bg-white hover:bg-gray-100 border-gray-200 text-blue-700"
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
      </div>
    </aside>

  );
}
