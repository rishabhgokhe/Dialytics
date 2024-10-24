import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export const MetricCard = ({ title, value, change, icon }) => {
  const isPositive = parseFloat(change) > 0;
  const changeColor = isPositive ? "text-green-500" : "text-red-500";
  const ChangeIcon = isPositive ? ArrowUpRight : ArrowDownRight;

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out rounded-lg border w-full h-44 overflow-hidden">
      <CardHeader className="flex items-left">
        <div className="w-10 h-10 text-gray-500">{icon}</div>
        <div className="text-sm font-medium">{title}</div>
      </CardHeader>
      <CardContent className="flex justify-between items-center px-4">
        <div className="text-4xl font-bold truncate">{value}</div>
        <div
          className={`flex items-center ${changeColor} text-sm font-semibold`}
        >
          <ChangeIcon className="w-5 h-5 mr-1" />
          <span className="truncate">{change}</span>
        </div>
      </CardContent>
    </Card>
  );
};
