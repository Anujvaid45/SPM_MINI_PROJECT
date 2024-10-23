import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const UsageChart = () => {
  const data = [
    { day: '1', usage: 2 },
    { day: '5', usage: 4 },
    { day: '10', usage: 6 },
    { day: '15', usage: 8 },
    { day: '20', usage: 10 },
    { day: '25', usage: 12 },
    { day: '30', usage: 15 },
  ];

  return (
    <Card className="h-96">
      <CardHeader>
        <CardTitle>Data Usage</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="usage" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default UsageChart;
