// src/pages/Dashboard.js
import React from 'react';
import CreateItem from '../components/CreateItem';
import ItemList from '../components/ItemList';
import SpotPrices from '../components/SpotPrices';
import HistoricalPrices from '../components/HistoricalPrices';
import ConvertPrice from '../components/ConvertPrice';

const Dashboard = () => {
  return (
    <div>
      <CreateItem />
      <ItemList />
      <SpotPrices />
      <HistoricalPrices />
      <ConvertPrice />
    </div>
  );
};

export default Dashboard;
