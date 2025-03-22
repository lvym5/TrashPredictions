import React from 'react';
import TabBar from '../components/TabBar';
import Analytics from './Analytics';
import Trashlist from './Trashlist';
import About from './About';

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

        {activeTab === 'Trash List' && (
          <Trashlist
          />
        )}

        {activeTab === 'Analytics' && (
          <Analytics
          />
        )}

        {activeTab === 'About' && (
          <About />
        )}
      </div>
    </div>
  );
}
