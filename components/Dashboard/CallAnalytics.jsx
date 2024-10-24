"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Component } from "@/components/Elements/chart"; // Assuming a chart component for call analytics
import { RadialChart } from "@/components/Elements/RadialChart";
import { HorizontalBarChart } from "@/components/Elements/HorizontalBarChart";
import { DatePickerWithRange } from "../Elements/date-range-picker";
import { DownloadIcon } from "lucide-react";
import { Button } from "../ui/button";
import { fetchCSVData } from "@/utils/fetchCSV";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Papa from "papaparse";
import { Input } from "@/components/ui/input";
import PhoneIcon from "@/public/SVGs/PhoneIcon";
import CallMissed01Icon from "@/public/SVGs/CallMissed01Icon";
import CallMissed04Icon from "@/public/SVGs/CallMissed04Icon";
import VoiceIcon from "@/public/SVGs/VoiceIcon";
import CallAdd02Icon from "@/public/SVGs/CallAdd02Icon";

export const CallAnalytics = () => {
  const [callData, setCallData] = useState([]);
  const [recentCalls, setRecentCalls] = useState([]);
  const [incomingCount, setIncomingCount] = useState(0);
  const [outgoingCount, setOutgoingCount] = useState(0);

  const [abandonedCountIncoming, setAbandonedCountIncoming] = useState(0);
  const [abandonedCountOutgoing, setAbandonedCountOutgoing] = useState(0);

  const [voiceMailCountIncoming, setVoiceMailCountIncoming] = useState(0);
  const [voiceMailCountOutgoing, setVoiceMailCountOutgoing] = useState(0);

  const [connectedCountIncoming, setConnectedCountIncoming] = useState(0);
  const [connectedCountOutgoing, setConnectedCountOutgoing] = useState(0);

  const [monthCounts, setMonthCounts] = useState({
    June: 0,
    July: 0,
    August: 0,
    September: 0,
    October: 0,
    November: 0,
  });

  useEffect(() => {
    const loadCSVData = async () => {
      try {
        const data = await fetchCSVData("/call_data.csv");
        const recent = await fetchCSVData("/recent_calls.csv");
        setCallData(data);
        setRecentCalls(recent);

        const incomingCount = data.filter(
          (call) => call.Direction === "Incoming"
        ).length;
        const outgoingCount = data.filter(
          (call) => call.Direction === "Outgoing"
        ).length;
        setIncomingCount(incomingCount);
        setOutgoingCount(outgoingCount);

        const abandonedCountIncoming = data.filter(
          (call) =>
            call["Call Status"] === "Missed" && call.Direction === "Incoming"
        ).length;
        const abandonedCountOutgoing = data.filter(
          (call) =>
            call["Call Status"] === "Missed" && call.Direction === "Outgoing"
        ).length;
        setAbandonedCountIncoming(abandonedCountIncoming);
        setAbandonedCountOutgoing(abandonedCountOutgoing);

        const voiceMailCountIncoming = data.filter(
          (call) =>
            call["Call Status"] === "Voicemail" && call.Direction === "Incoming"
        ).length;
        const voiceMailCountOutgoing = data.filter(
          (call) =>
            call["Call Status"] === "Voicemail" && call.Direction === "Outgoing"
        ).length;
        setVoiceMailCountIncoming(voiceMailCountIncoming);
        setVoiceMailCountOutgoing(voiceMailCountOutgoing);

        const connectedCountIncoming = data.filter(
          (call) =>
            call["Call Status"] === "Completed" && call.Direction === "Incoming"
        ).length;
        const connectedCountOutgoing = data.filter(
          (call) =>
            call["Call Status"] === "Completed" && call.Direction === "Outgoing"
        ).length;
        setConnectedCountIncoming(connectedCountIncoming);
        setConnectedCountOutgoing(connectedCountOutgoing);

        const newMonthCounts = {
          June: 0,
          July: 0,
          August: 0,
          September: 0,
          October: 0,
          November: 0,
        };

        data.forEach((call) => {
          const callDate = new Date(call["Call Time"]);
          const month = callDate.toLocaleString("default", { month: "long" });

          if (newMonthCounts.hasOwnProperty(month)) {
            newMonthCounts[month]++;
          }
        });

        setMonthCounts(newMonthCounts);
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
      <div className="flex flex-col gap-4 col-span-2 w-full">
        {/* Top two cards */}
        <div className="flex gap-4">
          <Card className="col-span-4 w-full max-w-[60%] shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
            <CardHeader>
              <CardTitle className="text-xl font-bold">
                Call Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-3 gap-4 py-8 items-center">
              {/* Header Row */}
              <div className="font-bold pb-4">Name</div>
              <div className="font-bold pb-4">Incoming</div>
              <div className="font-bold pb-4">Outgoing</div>

              {/* Data Rows */}
              {[
                {
                  label: "Calls",
                  incoming: incomingCount,
                  outgoing: outgoingCount,
                  icon: <PhoneIcon className="h-6 w-6 text-blue-500" />,
                },
                {
                  label: "Abandoned",
                  incoming: abandonedCountIncoming,
                  outgoing: abandonedCountOutgoing,
                  icon: <CallMissed04Icon />,
                },
                {
                  label: "VoiceMail",
                  incoming: voiceMailCountIncoming,
                  outgoing: voiceMailCountOutgoing,
                  icon: <VoiceIcon />,
                },
                {
                  label: "Connected",
                  incoming: connectedCountIncoming,
                  outgoing: connectedCountOutgoing,
                  icon: <CallAdd02Icon />,
                },
              ].map(({ label, incoming, outgoing, icon }, idx) => (
                <React.Fragment key={idx}>
                  <div className="flex gap-2 items-center">
                    <span>{icon}</span>
                    <span>{label}</span>
                  </div>
                  <div>{incoming}</div>
                  <div>{outgoing}</div>
                </React.Fragment>
              ))}
            </CardContent>
          </Card>

          <Card className=" max-h-[500px] max-w-[500px]: shadow-lg hover:shadow-xl duration-300 ease-in-out ">
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>

            <CardContent className=" ">
              <HorizontalBarChart
                incomingCalls={incomingCount}
                outgoingCalls={outgoingCount}
                abandoned={abandonedCountIncoming + abandonedCountOutgoing}
                voicemail={voiceMailCountIncoming + voiceMailCountOutgoing}
                connected={connectedCountIncoming + connectedCountOutgoing}
                className="z-10"
              />
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-left gap-3">
          {/* Call Volume Analytics Chart */}
          <Card className="w-1/2 ">
            <CardHeader>
              <CardTitle>Call Volume Analytics</CardTitle>
            </CardHeader>
            <CardContent className="">
              <RadialChart
                June={monthCounts.June}
                July={monthCounts.July}
                August={monthCounts.August}
                September={monthCounts.September}
                October={monthCounts.October}
                November={monthCounts.November}
              />{" "}
              {/* Placeholder for analytics chart */}
            </CardContent>
          </Card>

          <Card className="">
            <CardHeader>
              <CardTitle>Detailed Call Log</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Input type="search" placeholder="Search calls..." />
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date/Time</TableHead>
                    <TableHead>Agent</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Sentiment</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>2023-06-15 14:30</TableCell>
                    <TableCell>John Doe</TableCell>
                    <TableCell>5:23</TableCell>
                    <TableCell>Positive</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        Play
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>2023-06-15 15:45</TableCell>
                    <TableCell>Jane Smith</TableCell>
                    <TableCell>3:17</TableCell>
                    <TableCell>Neutral</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        Play
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>2023-06-15 16:20</TableCell>
                    <TableCell>Mike Johnson</TableCell>
                    <TableCell>8:02</TableCell>
                    <TableCell>Negative</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        Play
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
};
