"use client";

import React, { useEffect, useState } from "react";
import { fetchCSVData } from "@/utils/fetchCSV";
import PhoneIcon from "@/public/SVGs/PhoneIcon";
import CallMissed01Icon from "@/public/SVGs/CallMissed01Icon";
import ChartAverageIcon from "@/public/SVGs/ChartAverageIcon";
import UserSharingIcon from "@/public/SVGs/UserSharingIcon";
import { MetricCard } from "./MetricCard";
import { LineChartGraph } from "./LineChartGraph";

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
      } catch (error) {
        console.error("Error loading CSV data:", error);
      }
    };

    const calculateMetrics = (data) => {
      const total = data.length;

      const durations = data
        .map((call) => parseFloat(call.Duration))
        .filter((duration) => !isNaN(duration) && duration > 0);
      67;

      const avg =
        durations.length > 0
          ? durations.reduce((total, duration) => total + duration, 0) /
            durations.length
          : 0;

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

      <div className="col-span-2">
        <LineChartGraph />
      </div>
    </div>
  );
};
