"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Component } from "@/components/Elements/chart";

import { DatePickerWithRange } from "../Elements/date-range-picker";

import { DownloadIcon } from "lucide-react";
import { Button } from "../ui/button";
import { fetchCSVData } from "@/utils/fetchCSV";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export const Overview = () => {
  const [mockData, setMockData] = useState([]);
  const [recentCalls, setRecentCalls] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const loadCSVData = async () => {
      try {
        const mockData = await fetchCSVData("/mock_data.csv");
        const recentCalls = await fetchCSVData("/recent_calls.csv");
        setMockData(mockData);
        setRecentCalls(recentCalls);
      } catch (error) {
        console.error("Error loading CSV data:", error);
      }
    };
    loadCSVData();
  }, []);

  const totalCalls = mockData.length;
  const convertDurationToMinutes = (duration) => {
    const [minutes, seconds] = duration.split(":").map(Number);
    return minutes + seconds / 60;
  };

  const recentCallDurations = recentCalls.map((call) =>
    convertDurationToMinutes(call.duration)
  );
  const avgDuration =
    recentCallDurations.reduce((total, duration) => total + duration, 0) /
    recentCallDurations.length;

  const incomingCallRate =
    (mockData.reduce((sum, day) => sum + day.incomingCalls, 0) / totalCalls) *
    100;

  return (
    <>
      <main className="p-4">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <div className="flex items-center space-x-2">
            <DatePickerWithRange />
            <Button variant="outline">
              <DownloadIcon className="mr-2 h-4 w-4" />
              Download
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {/* Total Calls */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Total Calls</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCalls}</div>
              <p className="text-xs">+20.1% from last month</p>
            </CardContent>
          </Card>

          {/* Average Call Duration */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">
                Avg. Duration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{avgDuration.toFixed(2)}</div>
              <p className="text-xs">-5.2% from last month</p>
            </CardContent>
          </Card>

          {/* Incoming Call Rate */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">
                Incoming Call Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {incomingCallRate.toFixed(1)}%
              </div>
              <p className="text-xs">+2.5% from last month</p>
            </CardContent>
          </Card>

          {/* Active Now */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Active Now</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+573</div>
              <p className="text-xs">+201 since last hour</p>
            </CardContent>
          </Card>
        </div>

        {/* Graph and Recent Calls Section */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
          {/* Call Volume Overview Chart */}
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <Component />
            </CardContent>
          </Card>

          {/* Recent Calls List */}
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Recent Calls</CardTitle>
              <CardDescription>
                You received {recentCalls.length} calls this month.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {recentCalls.map((call, index) => (
                  <div className="flex items-center" key={index}>
                    <Avatar className="h-9 w-9">
                      <AvatarImage
                        src={`/avatar.jpg`}
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
    </>
  );
};
