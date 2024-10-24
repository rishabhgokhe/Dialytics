"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fetchCSVData } from "@/utils/fetchCSV";
import { MetricCard } from "../Elements/MetricCard";
import { LineChartGraph } from "./CallMetrics/LineChartGraph";
import PhoneSquareIcon from "@/public/SVGs/PhoneSquareIcon";
import ChartAverageIcon from "@/public/SVGs/ChartAverageIcon";
import CallMissed01Icon from "@/public/SVGs/CallMissed01Icon";
import ClockIcon from "@/public/SVGs/ClockIcon";
import StarIcon from "@/public/SVGs/StarIcon";
import UserIcon from "@/public/SVGs/UserIcon";

export const Overview = () => {
  const [callData, setCallData] = useState([]);
  const [totalCalls, setTotalCalls] = useState(0);
  const [avgDuration, setAvgDuration] = useState(0);
  const [missedCallRate, setMissedCallRate] = useState(0);
  const [answeredCallRate, setAnsweredCallRate] = useState(0);
  const [averageWaitTime, setAverageWaitTime] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [topCaller, setTopCaller] = useState("");
  const [topReceiver, setTopReceiver] = useState("");

  const calculateMetrics = (data) => {
    const total = data.length;
    const durations = data
      .map((call) => parseFloat(call.Duration))
      .filter((duration) => !isNaN(duration) && duration > 0);

    const avgDuration = durations.length > 0
      ? durations.reduce((total, duration) => total + duration, 0) / durations.length
      : 0;

    const totalWaitTime = data
      .map((call) => parseFloat(call["Wait Time (seconds)"]))
      .filter((waitTime) => !isNaN(waitTime))
      .reduce((total, waitTime) => total + waitTime, 0);

    const avgWaitTime = total > 0 ? totalWaitTime / total : 0;

    const totalRating = data
      .map((call) => parseFloat(call.Rating))
      .filter((rating) => !isNaN(rating))
      .reduce((total, rating) => total + rating, 0);

    const avgRating = total > 0 ? totalRating / total : 0;

    const missedCalls = data.filter((call) => call["Call Status"] === "Missed").length;
    const missedRate = (missedCalls / total) * 100;

    const answeredCalls = data.filter((call) => call["Answered"] === "Yes").length;
    const answeredRate = (answeredCalls / total) * 100;

    const callerCount = data.reduce((acc, call) => {
      const caller = call["Caller Name"];
      acc[caller] = (acc[caller] || 0) + 1;
      return acc;
    }, {});

    const receiverCount = data.reduce((acc, call) => {
      const receiver = call["Receiver Name"];
      acc[receiver] = (acc[receiver] || 0) + 1;
      return acc;
    }, {});

    const topCaller = Object.keys(callerCount).reduce((a, b) => (callerCount[a] > callerCount[b] ? a : b), "");
    const topReceiver = Object.keys(receiverCount).reduce((a, b) => (receiverCount[a] > receiverCount[b] ? a : b), "");

    // Set calculated metrics
    setTotalCalls(total);
    setAvgDuration(avgDuration.toFixed(2));
    setMissedCallRate(missedRate.toFixed(2));
    setAnsweredCallRate(answeredRate.toFixed(2));
    setAverageWaitTime(avgWaitTime.toFixed(2));
    setAverageRating(avgRating.toFixed(2));
    setTopCaller(topCaller);
    setTopReceiver(topReceiver);
  };

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

    loadCallData();
  }, []);

  return (
    <>
      <main className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
          <MetricCard
            title="Total Calls"
            value={totalCalls}
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
            title="Answered Call Rate"
            value={`${answeredCallRate}%`}
            change="+2%"
            icon={<PhoneSquareIcon />}
          />
          <MetricCard
            title="Average Wait Time"
            value={`${averageWaitTime} sec.`}
            change="+5%"
            icon={<ClockIcon />}
          />
          <MetricCard
            title="Average Rating"
            value={`${averageRating}/5`}
            change="-0.5%"
            icon={<StarIcon />}
          />
          <MetricCard
            title="Top Caller"
            value={topCaller}
            icon={<UserIcon />}
          />
          <MetricCard
            title="Top Receiver"
            value={topReceiver}
            icon={<UserIcon />}
          />
        </div>
        <div className="col-span-2 mx-5">
          <LineChartGraph className="col-span-2" />
        </div>
      </main>
    </>
  );
};
