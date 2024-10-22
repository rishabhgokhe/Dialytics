"use client";

import React, { useEffect, useState } from "react";
import { fetchCSVData } from "@/utils/fetchCSV";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import PhoneIcon from "@/public/SVGs/PhoneIcon";
import CallMissed01Icon from "@/public/SVGs/CallMissed01Icon";
import ChartAverageIcon from "@/public/SVGs/ChartAverageIcon";
import UserSharingIcon from "@/public/SVGs/UserSharingIcon";

export const CallMetrics = () => {
  const [callData, setCallData] = useState([]);
  const [totalCalls, setTotalCalls] = useState(0);
  const [avgDuration, setAvgDuration] = useState(0);
  const [missedCallRate, setMissedCallRate] = useState(0);
  const [answeredCallRate, setAnsweredCallRate] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);

  useEffect(() => {
    const loadCallData = async () => {
      try {
        const data = await fetchCSVData("/call_data.csv");
        setCallData(data);
        calculateMetrics(data);
        console.log(data);
      } catch (error) {
        console.error("Error loading CSV data:", error);
      }
    };

    const calculateMetrics = (data) => {
      const total = data.length;
      const durations = data.map((call) =>
        Number(call["Call Duration (seconds)"])
      );
      const avg =
        durations.reduce((total, duration) => total + duration, 0) /
        durations.length;

      const missedCalls = data.filter(
        (call) => call["Call Status"] === "Missed"
      ).length;
      const missedRate = (missedCalls / total) * 100;

      const answeredCalls = data.filter(
        (call) => call["Answered"] === "Yes"
      ).length;
      const answeredRate = (answeredCalls / total) * 100;

      setTotalCalls(total);
      setAvgDuration(avg.toFixed(2));
      setMissedCallRate(missedRate.toFixed(2));
      setAnsweredCallRate(answeredRate.toFixed(2));
      setActiveUsers(425);
    };

    loadCallData();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
      <MetricCard
        title="Total Calls"
        value={totalCalls}
        change="+15%"
        icon={<PhoneIcon />}
      />
      <MetricCard
        title="Avg. Call Duration"
        value={`${avgDuration} sec.`}
        change="+10%"
        icon={<ChartAverageIcon />}
      />
      <MetricCard
        title="Missed Call Rate"
        value={`${missedCallRate}%`}
        change="-3%"
        icon={<CallMissed01Icon />}
      />
      <MetricCard
        title="Active Users"
        value={activeUsers}
        change="+50 since last hour"
        icon={<UserSharingIcon />}
      />
    </div>
  );
};

const MetricCard = ({ title, value, change, icon }) => {
  const isPositive = parseFloat(change) > 0;
  const changeColor = isPositive ? "text-green-500" : "text-red-500";
  const ChangeIcon = isPositive ? ArrowUpRight : ArrowDownRight;

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out rounded-lg border w-full h-44 overflow-hidden">
      <CardHeader className="flex items-left">
        <div className="w-10 h-10 text-gray-500">{icon}</div>
        <div className="text-sm font-medium text-gray-600">{title}</div>
      </CardHeader>
      <CardContent className="flex justify-between items-center px-4">
        <div className="text-4xl font-bold text-gray-900 truncate">{value}</div>
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
