"use client";

import React, { useEffect, useState } from "react";
import { fetchCSVData } from "@/utils/fetchCSV";
import PhoneIcon from "@/public/SVGs/PhoneSquareIcon";
import CallMissed01Icon from "@/public/SVGs/CallMissed01Icon";
import ChartAverageIcon from "@/public/SVGs/ChartAverageIcon";
import UserSharingIcon from "@/public/SVGs/UserSharingIcon";
import { MetricCard } from "../../Elements/MetricCard";
import { LineChartGraph } from "./LineChartGraph";
import FilterTabs from "@/components/Elements/FilterTabs";

export const CallMetrics = () => {
  const [callData, setCallData] = useState([]);
  const [filteredCallData, setFilteredCallData] = useState([]);
  const [totalCalls, setTotalCalls] = useState(0);
  const [avgDuration, setAvgDuration] = useState(0);
  const [missedCallRate, setMissedCallRate] = useState(0);
  const [answeredCallRate, setAnsweredCallRate] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const [selectedFilters, setSelectedFilters] = useState({
    Incoming: false,
    Outgoing: false,
    Completed: false,
    Missed: false,
  });

  // Define the calculateMetrics function
  const calculateMetrics = (data) => {
    const total = data.length;

    const durations = data
      .map((call) => parseFloat(call.Duration))
      .filter((duration) => !isNaN(duration) && duration > 0);

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

    // Update metrics
    setTotalCalls(total);
    setAvgDuration(avg.toFixed(2));
    setMissedCallRate(missedRate.toFixed(2));
    setAnsweredCallRate(answeredRate.toFixed(2));
    setActiveUsers(425); // This can be dynamic depending on the data
  };

  useEffect(() => {
    const loadCallData = async () => {
      try {
        const data = await fetchCSVData("/call_data.csv");
        setCallData(data);
        setFilteredCallData(data); // Default to showing all data
        calculateMetrics(data); // Calculate metrics with all data initially
      } catch (error) {
        console.error("Error loading CSV data:", error);
      }
    };

    loadCallData();
  }, []);

  useEffect(() => {
    const filterData = () => {
      let filtered = callData;

      if (selectedFilters.Incoming) {
        filtered = filtered.filter((call) => call["Direction"] === "Incoming");
      }
      if (selectedFilters.Outgoing) {
        filtered = filtered.filter((call) => call["Direction"] === "Outgoing");
      }
      if (selectedFilters.Completed) {
        filtered = filtered.filter(
          (call) => call["Call Status"] === "Completed"
        );
      }
      if (selectedFilters.Missed) {
        filtered = filtered.filter((call) => call["Call Status"] === "Missed");
      }

      setFilteredCallData(filtered);
      calculateMetrics(filtered);
    };

    filterData();
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
          <LineChartGraph data={filteredCallData} />
        </div>
      </div>
    </>
  );
};
