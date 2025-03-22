import React from "react";

// Reusable component for Default Map Icon
export function DefaultMapIcon({
    topPosition, // New prop with a default value of "70%"
    leftPosition, // e.g., "30%", "50%", etc.
    building,
    floor,
    TrashIcon,
    TRASH_CANS,
    onBuildingChange,
    onFloorChange,
}) {
    return (
        <div
            className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer group"
            style={{ top: topPosition, left: leftPosition }}
            onClick={() => {
                onBuildingChange(building);
                onFloorChange(floor);
            }}
        >
            <div className="flex flex-col items-center">
                <div className="relative w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <img src={TrashIcon} alt="Trash Can" className="w-6 h-6" />
                    <div className="absolute bottom-[-5px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[5px] border-r-[5px] border-t-[6px] border-l-transparent border-r-transparent border-t-gray-800 z-0" />
                    <div className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full shadow">
                    {TRASH_CANS.length}

                    </div>
                </div>
                <span className="mt-1 text-xs bg-white px-2 py-0.5 rounded shadow text-gray-700">
                    {building}
                </span>
            </div>
        </div>
    );
}
