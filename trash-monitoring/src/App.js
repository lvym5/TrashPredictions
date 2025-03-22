import React, { useState } from 'react';
import TitleHeader from './components/TitleHeader';
import MainContent from './pages/MainContent'; // new wrapper

export default function App() {
  const [activeTab, setActiveTab] = useState('Map');
  const [selectedBuilding, setSelectedBuilding] = useState('');
  const [selectedFloor, setSelectedFloor] = useState('');

  const buildingData = {
    'Hekman Library': ['2nd Floor','3rd Floor', '4th Floor', '5th Floor'],
    'Science Building': ['Ground Floor', '1st Floor', '2nd Floor'],
    'CFAC': ['1st Floor']
  };

  const buildings = Object.keys(buildingData);
  const floors = selectedBuilding ? buildingData[selectedBuilding] : [];

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <TitleHeader />
      <MainContent
        activeTab={activeTab}
        onTabChange={setActiveTab}
        selectedBuilding={selectedBuilding}
        selectedFloor={selectedFloor}
        onBuildingChange={setSelectedBuilding}
        onFloorChange={setSelectedFloor}
        buildings={buildings}
        floors={floors}
      />
    </div>
  );
}
