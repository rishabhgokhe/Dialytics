"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import ThemeToggle from "@/components/Elements/themeToggle";
import TabChanger from "@/components/Elements/tabs";
import { CalendarIcon, DownloadIcon, BellIcon } from "lucide-react";
import { Component } from "@/components/Elements/chart";
import { fetchCSVData } from "@/utils/fetchCSV";

export default function CallLogDashboard() {
  const [mockData, setMockData] = useState([]);
  const [recentCalls, setRecentCalls] = useState([]);

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
  console.log(mockData);
  console.log(recentCalls);

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
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-4 border-b">
        <ThemeToggle />
        <TabChanger />
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src="/placeholder-avatar.jpg" alt="Rishabh Gokhe" />
            <AvatarFallback>RG</AvatarFallback>
          </Avatar>
          <span className="font-semibold">Rishabh Gokhe</span>
        </div>
        <div className="flex items-center space-x-4">
          <Input type="search" placeholder="Search..." className="w-64" />
          <Button variant="ghost" size="icon">
            <BellIcon className="h-5 w-5" />
          </Button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <div className="flex items-center space-x-2">
            <Button variant="outline">
              <CalendarIcon className="mr-2 h-4 w-4" />
              Oct 20, 2024 - Nov 09, 2023
            </Button>
            <Button variant="outline">
              <DownloadIcon className="mr-2 h-4 w-4" />
              Download
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Total Calls</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCalls}</div>
              <p className="text-xs">+20.1% from last month</p>
            </CardContent>
          </Card>
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

        {/* Graph & Recent Calls */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <Component />
            </CardContent>
          </Card>
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
    </div>
  );
}
