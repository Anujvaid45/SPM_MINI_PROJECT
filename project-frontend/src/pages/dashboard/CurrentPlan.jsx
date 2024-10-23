import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const CurrentPlan = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Current Plan</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">Premium Plan</h3>
            <p className="text-sm text-gray-500">Valid till: 31 Dec 2024</p>
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm">Data Usage</span>
              <span className="text-sm">15GB/20GB</span>
            </div>
            <Progress value={75} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">Data Speed</p>
              <p className="text-lg">100 Mbps</p>
            </div>
            <div>
              <p className="text-sm font-medium">Days Left</p>
              <p className="text-lg">15 Days</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrentPlan;