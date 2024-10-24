"use client";

import React, { useEffect, useState, useCallback } from "react";
import Papa from "papaparse";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

const fetchCSVData = async (csvFilePath) => {
  try {
    const response = await fetch(csvFilePath);
    if (!response.ok) throw new Error("Failed to fetch CSV data");
    const csvData = await response.text();
    return Papa.parse(csvData, { header: true }).data;
  } catch (error) {
    console.error("Error fetching or parsing CSV file:", error);
    return [];
  }
};

const DatePicker = ({ label, date, setDate }) => (
  <div className="flex flex-col space-y-1 w-full">
    <Label>{label}</Label>
    <Popover className="w-full">
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
          aria-haspopup="dialog"
          aria-expanded={Boolean(date)}
          aria-label={`Select a ${label.toLowerCase()}`}
        >
          <CalendarIcon className="mr-2" />
          {date ? format(new Date(date), "PPP") : <span>Pick a {label.toLowerCase()}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(selectedDate) => {
            if (selectedDate) {
              setDate(selectedDate);
            }
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  </div>
);

export const CallReports = () => {
  const [recentCalls, setRecentCalls] = useState([]);
  const [filterType, setFilterType] = useState("all");
  const [callerID, setCallerID] = useState("");
  const [rating, setRating] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState({ from: "", to: "" });
  const [callDuration, setCallDuration] = useState("all");
  const [outcome, setOutcome] = useState("all");
  const [answered, setAnswered] = useState("all");

  useEffect(() => {
    const loadRecentCalls = async () => {
      const recent = await fetchCSVData("/call_data.csv");
      setRecentCalls(recent);
    };
    loadRecentCalls();
  }, []);

  const handleFilter = useCallback(() => {
    setLoading(true);
    const { from, to } = dateRange;
    const fromDate = from ? new Date(from) : null;
    const toDate = to ? new Date(to) : null;

    const filtered = recentCalls.filter((call) => {
      const callDate = new Date(call["Call Time"] || "");
      const matchesType = filterType !== "all" ? call["Direction"]?.trim() === filterType : true;
      const matchesCallerID = callerID ? call["Call ID"]?.includes(callerID) : true;
      const matchesRating = rating ? parseFloat(call["Rating"] || 0) === parseFloat(rating) : true;
      const matchesDate = (!fromDate || callDate >= fromDate) && (!toDate || callDate <= toDate);
      const matchesDuration =
        callDuration === "short" ? parseFloat(call["Duration"] || 0) < 300
        : callDuration === "medium" ? parseFloat(call["Duration"] || 0) >= 300 && parseFloat(call["Duration"] || 0) <= 900
        : callDuration === "long" ? parseFloat(call["Duration"] || 0) > 900 : true;
      const matchesOutcome = outcome !== "all" ? call["Call Outcome"]?.trim() === outcome : true;
      const matchesAnswered = answered !== "all" ? call["Answered"] === answered : true;

      return matchesType && matchesCallerID && matchesRating && matchesDate && matchesDuration && matchesOutcome && matchesAnswered;
    });

    setFilteredData(filtered);
    setLoading(false);
  }, [recentCalls, filterType, callerID, rating, dateRange, callDuration, outcome, answered]);

  const downloadCSV = () => {
    if (filteredData.length === 0) return;
    const csv = Papa.unparse(filteredData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "filtered_calls.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className={"m-5"}>
      <CardHeader>
        <CardTitle>Call Reports</CardTitle>
        <CardDescription>
          You received {recentCalls.length} calls in total this year. Use the filters to generate reports.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {/* Call Type Filter */}
          <div>
            <Label htmlFor="filterType">Call Type</Label>
            <Select onValueChange={setFilterType}>
              <SelectTrigger id="filterType">
                <SelectValue placeholder="Select call type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="Incoming">Incoming</SelectItem>
                <SelectItem value="Outgoing">Outgoing</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="callerID">Call ID</Label>
            <Input
              type="text"
              id="callerID"
              value={callerID}
              onChange={(e) => setCallerID(e.target.value)}
              placeholder="Enter call ID"
            />
          </div>
          <div>
            <Label htmlFor="rating">Rating</Label>
            <Input
              type="number"
              id="rating"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              placeholder="Enter rating"
            />
          </div>
          <DatePicker label="From Date" date={dateRange.from} setDate={(from) => setDateRange((prev) => ({ ...prev, from }))} />
          <DatePicker label="To Date" date={dateRange.to} setDate={(to) => setDateRange((prev) => ({ ...prev, to }))} />
          {/* Call Duration Filter */}
          <div>
            <Label htmlFor="call-duration">Call Duration</Label>
            <Select onValueChange={setCallDuration}>
              <SelectTrigger id="call-duration">
                <SelectValue placeholder="Select call duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Durations</SelectItem>
                <SelectItem value="short">Short (&lt; 5 min)</SelectItem>
                <SelectItem value="medium">Medium (5-15 min)</SelectItem>
                <SelectItem value="long">Long (&gt; 15 min)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* Sentiment Filter */}
          <div>
            <Label htmlFor="outcome">Outcome</Label>
            <Select onValueChange={setOutcome}>
              <SelectTrigger id="outcome">
                <SelectValue placeholder="Select Outcome" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sentiments</SelectItem>
                <SelectItem value="Successful">Successful</SelectItem>
                <SelectItem value="Unsuccessful">Unsuccessful</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* Answered or not filter */}
          <div>
            <Label htmlFor="answered">Answered or not?</Label>
            <Select onValueChange={setAnswered}>
              <SelectTrigger id="answered">
                <SelectValue placeholder="Select answered calls" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Calls</SelectItem>
                <SelectItem value="Answered">Answered</SelectItem>
                <SelectItem value="Unanswered">Unanswered</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Filter and Download Buttons */}
        <div className="flex items-center space-x-2">
          <Button onClick={handleFilter} disabled={loading}>
            {loading ? "Filtering..." : "Filter Data"}
          </Button>
          {filteredData.length > 0 && (
            <Button onClick={downloadCSV} className="ml-2">
              Download Filtered CSV
            </Button>
          )}
        </div>

        {/* Filtered Data Display */}
        <div className="mt-6">
          {loading ? (
            <Skeleton className="h-6 w-full mb-4" />
          ) : (
            <div className="space-y-8 mt-6">
              {filteredData.map((call, index) => (
                <div className="flex items-center" key={index}>
                  <Avatar className="h-9 w-9">
                    <AvatarFallback>
                      {call["Caller ID"].charAt(0)}
                    </AvatarFallback>
                    <AvatarImage src={call["Avatar"]} />
                  </Avatar>
                  <div className="ml-3">
                    <p className="text-sm font-medium">{call["Caller ID"]}</p>
                    <p className="text-xs text-muted-foreground">
                      {call["Call Time"]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};