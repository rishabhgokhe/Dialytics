"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { fetchCSVData } from "@/utils/fetchCSV";

export const CallReports = () => {
  const [recentCalls, setRecentCalls] = useState([]);

  useEffect(() => {
    const loadRecentCalls = async () => {
      try {
        const recent = await fetchCSVData("/recent_calls.csv");
        setRecentCalls(recent);
      } catch (error) {
        console.error("Error loading CSV data:", error);
      }
    };

    loadRecentCalls();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Calls</CardTitle>
        <CardDescription>You received {recentCalls.length} calls this week.</CardDescription>
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
                <p className="text-sm font-medium leading-none">{call.name}</p>
                <p className="text-sm">{call.number} - {call.duration}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};