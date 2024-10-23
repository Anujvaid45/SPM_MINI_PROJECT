import React from 'react';
import { useAuth } from '../../context/AuthContext';
import UsageChart from './UsageChart';
import CurrentPlan from './CurrentPlan';
import TransactionHistory from './TransactionHistory';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Welcome, {user.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CurrentPlan />
        <UsageChart />
        <TransactionHistory />
      </div>
    </div>
  );
};

export default Dashboard;