"use client";

import * as React from "react";
import { CalendarIcon, DownloadIcon, BellIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ThemeToggle from "@/components/Elements/themeToggle";
import { Component } from "@/components/Elements/chart";
import TabChanger from "@/components/Elements/tabs";

const mockData = [
  {
    date: "2024-09-01",
    totalCalls: 75,
    incomingCalls: 50,
    outgoingCalls: 25,
    avgDuration: 120,
  },
  {
    date: "2024-09-02",
    totalCalls: 80,
    incomingCalls: 55,
    outgoingCalls: 25,
    avgDuration: 130,
  },
];

const recentCalls = [
  {
    name: "Rishabh Gokhe",
    number: "9098447696",
    duration: "5:23",
    amount: 299.0,
  },
  {
    name: "Rishabh Gokhe",
    number: "9098447696",
    duration: "2:45",
    amount: 39.0,
  },
  {
    name: "Rishabh Gokhe",
    number: "9098447696",
    duration: "8:12",
    amount: 199.0,
  },
  {
    name: "Rishabh Gokhe",
    number: "9098447696",
    duration: "1:30",
    amount: 99.0,
  },
  {
    name: "Rishabh Gokhe",
    number: "9098447696",
    duration: "3:58",
    amount: 39.0,
  },
];

const topCallers = [
  {
    name: "John Doe",
    number: "9876543210",
    totalCalls: 35,
    totalDuration: "1:45:00",
  },
  {
    name: "Jane Smith",
    number: "9876543211",
    totalCalls: 28,
    totalDuration: "1:25:00",
  },
  {
    name: "David Johnson",
    number: "9876543212",
    totalCalls: 22,
    totalDuration: "1:15:00",
  },
];

export default function CallLogDashboard() {
  const totalCalls = mockData.reduce((sum, day) => sum + day.totalCalls, 0);
  const avgDuration =
    mockData.reduce((sum, day) => sum + day.avgDuration, 0) / mockData.length;
  const incomingCallRate =
    (mockData.reduce((sum, day) => sum + day.incomingCalls, 0) / totalCalls) *
    100;

  return (
    <div className="min-h-screen bg-background w-full">
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
              <div className="text-2xl font-bold">
                {Math.floor(avgDuration / 60)}:
                {(avgDuration % 60).toString().padStart(2, "0")}
              </div>
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
                You received 265 calls this month.
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

        {/* Top Callers Section */}
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">Top Callers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topCallers.map((caller, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">
                    {caller.name}
                  </CardTitle>
                  <CardDescription>{caller.number}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div className="text-sm">Total Calls</div>
                    <div className="font-bold">{caller.totalCalls}</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-sm">Total Duration</div>
                    <div className="font-bold">{caller.totalDuration}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}