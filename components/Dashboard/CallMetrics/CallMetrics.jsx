"use client";

import React, { useEffect, useState, useMemo } from "react";
import { fetchCSVData } from "@/utils/fetchCSV";
import CallMissed01Icon from "@/public/SVGs/CallMissed01Icon";
import ChartAverageIcon from "@/public/SVGs/ChartAverageIcon";
import UserSharingIcon from "@/public/SVGs/UserSharingIcon";
import PhoneSquareIcon from "@/public/SVGs/PhoneSquareIcon";
import { MetricCard } from "../../Elements/MetricCard";
import { LineChartGraph } from "./LineChartGraph";
import FilterTabs from "@/components/Elements/FilterTabs";
import PerformanceCard from "@/components/Elements/PerformanceCard";

export const CallMetrics = () => {
  const [callData, setCallData] = useState([]);
  const [totalCalls, setTotalCalls] = useState(0);
  const [avgDuration, setAvgDuration] = useState(0);
  const [missedCallRate, setMissedCallRate] = useState(0);
  const [answeredCallRate, setAnsweredCallRate] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0); // Placeholder for dynamic active users
  const [selectedFilters, setSelectedFilters] = useState({
    Incoming: false,
    Outgoing: false,
    Completed: false,
    Missed: false,
  });

  const calculateMetrics = (data) => {
    const total = data.length;
    const durations = data
      .map((call) => parseFloat(call.Duration))
      .filter((duration) => !isNaN(duration) && duration > 0);

    const avg = durations.length > 0
      ? durations.reduce((total, duration) => total + duration, 0) / durations.length
      : 0;

    const missedCalls = data.filter((call) => call["Call Status"] === "Missed").length;
    const missedRate = (missedCalls / total) * 100;

    const answeredCalls = data.filter((call) => call["Answered"] === "Yes").length;
    const answeredRate = (answeredCalls / total) * 100;

    // Update state with metrics
    setTotalCalls(total);
    setAvgDuration(avg.toFixed(2));
    setMissedCallRate(missedRate.toFixed(2));
    setAnsweredCallRate(answeredRate.toFixed(2));
    setActiveUsers(425); // Placeholder for dynamic value
  };

  useEffect(() => {
    const loadCallData = async () => {
      try {
        const data = await fetchCSVData("/call_data.csv");
        setCallData(data);
        calculateMetrics(data); // Calculate metrics with all data initially
      } catch (error) {
        console.error("Error loading CSV data:", error);
      }
    };

    loadCallData();
  }, []);

  const filteredCallData = useMemo(() => {
    let filtered = callData;

    if (selectedFilters.Incoming) {
      filtered = filtered.filter((call) => call["Direction"] === "Incoming");
    }
    if (selectedFilters.Outgoing) {
      filtered = filtered.filter((call) => call["Direction"] === "Outgoing");
    }
    if (selectedFilters.Completed) {
      filtered = filtered.filter((call) => call["Call Status"] === "Completed");
    }
    if (selectedFilters.Missed) {
      filtered = filtered.filter((call) => call["Call Status"] === "Missed");
    }

    calculateMetrics(filtered);
    return filtered;
  }, [selectedFilters, callData]);

  return (
    <>
      <FilterTabs
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
        <MetricCard
          title="Total Calls"
          value={filteredCallData.length}
          change="+15%"
          icon={<PhoneSquareIcon />}
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
          <LineChartGraph data={filteredCallData} />
        </div>
        <div className="col-span-2">
          <PerformanceCard />
        </div>
      </div>
    </>
  );
};