"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Component } from "@/components/Elements/chart"; // Assuming a chart component for call analytics
import { DatePickerWithRange } from "../Elements/date-range-picker";
import { DownloadIcon } from "lucide-react";
import { Button } from "../ui/button";
import { fetchCSVData } from "@/utils/fetchCSV";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export const CallAnalytics = () => {
  const [callData, setCallData] = useState([]);
  const [recentCalls, setRecentCalls] = useState([]);

  useEffect(() => {
    const loadCSVData = async () => {
      try {
        const data = await fetchCSVData("/call_data.csv");
        const recent = await fetchCSVData("/recent_calls.csv");
        setCallData(data);
        setRecentCalls(recent);
      } catch (error) {
        console.error("Error loading CSV data:", error);
      }
    };
    loadCSVData();
  }, []);

  const totalCalls = callData.length;

  const calculateCallDuration = (duration) => {
    const [minutes, seconds] = duration.split(":").map(Number);
    return minutes + seconds / 60;
  };

  const recentCallDurations = recentCalls.map((call) =>
    calculateCallDuration(call.duration)
  );
  const avgDuration =
    recentCallDurations.reduce((total, duration) => total + duration, 0) /
    recentCallDurations.length;

  const missedCallRate =
    (callData.reduce((sum, day) => sum + day.missedCalls, 0) / totalCalls) *
    100;

  return (
    <main className="p-4">

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* Total Calls */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Total Calls</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCalls}</div>
            <p className="text-xs">+15% from last month</p>
          </CardContent>
        </Card>

        {/* Average Call Duration */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Avg. Call Duration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgDuration.toFixed(2)}</div>
            <p className="text-xs">+10% from last month</p>
          </CardContent>
        </Card>

        {/* Missed Call Rate */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Missed Call Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {missedCallRate.toFixed(1)}%
            </div>
            <p className="text-xs">-3% from last month</p>
          </CardContent>
        </Card>

        {/* Active Users */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+425</div>
            <p className="text-xs">+50 since last hour</p>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Chart and Recent Calls */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Call Volume Analytics Chart */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Call Volume Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <Component /> {/* Placeholder for analytics chart */}
          </CardContent>
        </Card>

        {/* Recent Calls List */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Calls</CardTitle>
            <CardDescription>
              You had {recentCalls.length} calls this week.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {recentCalls.map((call, index) => (
                <div className="flex items-center" key={index}>
                  <Avatar className="h-9 w-9">
                    <AvatarImage
                      src={`/placeholder-avatar-${index + 1}.jpg`}
                      alt={call.name}
                    />
                    <AvatarFallback>
                      {call.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {call.name}
                    </p>
                    <p className="text-sm">
                      {call.number} - {call.duration}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};