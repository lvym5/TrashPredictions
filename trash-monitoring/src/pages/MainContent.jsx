import React from 'react';
import TabBar from '../components/TabBar';
import MapView from './Map';

export default function MainContent({
  activeTab,
  onTabChange,
  selectedBuilding,
  selectedFloor,
  onBuildingChange,
  onFloorChange,
  buildings,
  floors,
}) {
  return (
    <div className="flex flex-1 h-full bg-gray-100">
      <div className="flex flex-col w-full h-full p-4 bg-white shadow-inner rounded-md mx-4 my-4">
        {/* Tabs always at the top */}
        <TabBar activeTab={activeTab} onTabChange={onTabChange} />

        {/* Main content switches based on tab */}
        {activeTab === 'Map' && (
          <MapView
            selectedBuilding={selectedBuilding}
            selectedFloor={selectedFloor}
            onBuildingChange={onBuildingChange}
            onFloorChange={onFloorChange}
            buildings={buildings}
            floors={floors}
            activeTab={activeTab}
            onTabChange={onTabChange}
          />
        )}

        {activeTab === 'Visualizations' && (
          <div className="flex-1 flex items-center justify-center text-gray-700">
            <h2 className="text-xl font-semibold">📊 Visualizations coming soon!</h2>
          </div>
        )}

        {activeTab === 'Charts' && (
          <div className="flex-1 flex items-center justify-center text-gray-700">
            <h2 className="text-xl font-semibold">📈 Charts go here!</h2>
          </div>
        )}

        {activeTab === 'Data' && (
          <div className="flex-1 flex items-center justify-center text-gray-700">
            <h2 className="text-xl font-semibold">📂 Raw data viewer (WIP)</h2>
          </div>
        )}
      </div>
    </div>
  );
}
