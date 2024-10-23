"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import ThemeToggle from "@/components/Elements/themeToggle";
import { Overview } from "./Overview";
import { CallMetrics } from "./CallMetrics/CallMetrics";
import { CallAnalytics } from "./CallAnalytics";
import { CallReports } from "./CallReports";

import { BellIcon, DownloadIcon } from "lucide-react";
import { DatePickerWithRange } from "../Elements/date-range-picker";

export default function CallLogDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen w-full">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src="/avatar.png" alt="Rishabh Gokhe" />
            <AvatarFallback>RG</AvatarFallback>
          </Avatar>
          <span className="font-semibold">Rishabh Gokhe</span>
        </div>

        {/* Tabs */}
        <div className="flex justify-center items-center">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full max-w-md"
          >
            <TabsList className="grid grid-cols-4">
              {["Overview", "Call Analytics", "Call Metrics", "Reports"].map(
                (tab) => (
                  <TabsTrigger
                    key={tab.toLowerCase()}
                    value={tab.toLowerCase()}
                    className={`text-sm font-medium ${
                      activeTab === tab.toLowerCase()
                        ? "bg-primary text-primary-foreground rounded-md"
                        : "hover:text-foreground"
                    }`}
                  >
                    {tab}
                  </TabsTrigger>
                )
              )}
            </TabsList>
          </Tabs>
        </div>

        <Input type="search" placeholder="Search..." className="w-64" />

        <div className="flex space-x-2">
          <ThemeToggle />
          <Button variant="outline" size="icon">
            <BellIcon className="h-5 w-5" />
          </Button>
        </div>
      </nav>

      {/* Header Section */}
      <div className="flex justify-between items-center m-6">
        <h1 className="text-3xl font-bold">{activeTab.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase())}</h1>
        <div className="flex items-center space-x-2">
          <DatePickerWithRange />
          <Button variant="outline">
            <DownloadIcon className="mr-2 h-4 w-4" />
            Download
          </Button>
        </div>
      </div>

      {activeTab === "overview" ? (
        <Overview />
      ) : activeTab === "call analytics" ? (
        <CallAnalytics />
      ) : activeTab === "call metrics" ? (
        <CallMetrics />
      ) : activeTab === "reports" ? (
        <CallReports />
      ) : null}
    </div>
  );
}
