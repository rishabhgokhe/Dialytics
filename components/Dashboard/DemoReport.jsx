"use client";

import React, { useEffect, useState } from "react";
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

// Utility function to fetch CSV data
const fetchCSVData = async (csvFilePath) => {
  try {
    const response = await fetch(csvFilePath);
    if (!response.ok) throw new Error("Network response was not ok");
    const csvData = await response.text();
    const parsedData = Papa.parse(csvData, { header: true }).data;
    return parsedData;
  } catch (error) {
    console.error("Error fetching or parsing CSV file:", error);
    return [];
  }
};

export const CallReports = () => {
  const [recentCalls, setRecentCalls] = useState([]);
  const [filterType, setFilterType] = useState(""); // Empty to allow "no filter" as default
  const [callerID, setCallerID] = useState("");
  const [rating, setRating] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState({ from: "", to: "" }); // Date range state

  // Fetch CSV data when the component loads
  useEffect(() => {
    const loadRecentCalls = async () => {
      const recent = await fetchCSVData("/call_data.csv");
      setRecentCalls(recent);
    };

    loadRecentCalls();
  }, []);

  // Convert date string to Date object for comparison (extracting from "Call Time")
  const parseDate = (dateStr) => new Date(dateStr);

  // Filter calls based on applied filters (Direction, Call ID, Rating, Date Range)
  const handleFilter = () => {
    setLoading(true);
    const { from, to } = dateRange;
    const fromDate = from ? new Date(from) : null;
    const toDate = to ? new Date(to) : null;

    const filtered = recentCalls.filter((call) => {
      const callDate = parseDate(call["Call Time"] || ""); // Using 'Call Time' to filter

      // Apply filters if they are set (ignores filters that are empty or not used)
      const matchesType = filterType
        ? call["Direction"]?.trim() === filterType
        : true;
      const matchesCallerID = callerID
        ? parseInt(call["Call ID"]?.replace(/^CALL-/, ""), 10) ===
          parseInt(callerID, 10)
        : true;
      const matchesRating = rating
        ? parseFloat(call["Rating"] || 0) === parseFloat(rating)
        : true;
      const matchesDate =
        (!fromDate || callDate >= fromDate) &&
        (!toDate || callDate <= toDate);

      // Ensure only complete records are shown (ignore incomplete rows)
      return (
        call["Call ID"] &&
        call["Caller ID"] &&
        matchesType &&
        matchesCallerID &&
        matchesRating &&
        matchesDate
      );
    });

    setFilteredData(filtered);
    setLoading(false);
  };

  // Download filtered data as a CSV
  const downloadCSV = () => {
    const csv = Papa.unparse(filteredData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.setAttribute("download", "filtered_calls.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Calls</CardTitle>
        <CardDescription>
          You received {recentCalls.length} calls this week.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Label htmlFor="filterType">Select Call Type</Label>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            id="filterType"
            className="p-2 border border-gray-300 rounded"
          >
            <option value="">All</option>
            <option value="Incoming">Incoming</option>
            <option value="Outgoing">Outgoing</option>
          </select>
        </div>
        <div className="mb-4">
          <Label htmlFor="callerID">Enter Call ID</Label>
          <input
            type="text"
            id="callerID"
            className="p-2 border border-gray-300 rounded"
            value={callerID}
            onChange={(e) => setCallerID(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="rating">Enter Rating</Label>
          <input
            type="number"
            id="rating"
            className="p-2 border border-gray-300 rounded"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
        </div>
        {/* Date Range Filter */}
        <div className="mb-4">
          <Label htmlFor="fromDate">From Date</Label>
          <input
            type="date"
            id="fromDate"
            className="p-2 border border-gray-300 rounded"
            value={dateRange.from}
            onChange={(e) =>
              setDateRange({ ...dateRange, from: e.target.value })
            }
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="toDate">To Date</Label>
          <input
            type="date"
            id="toDate"
            className="p-2 border border-gray-300 rounded"
            value={dateRange.to}
            onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
          />
        </div>
        <Button onClick={handleFilter} disabled={loading}>
          {loading ? "Filtering..." : "Filter Data"}
        </Button>
        {filteredData.length > 0 && (
          <Button onClick={downloadCSV} className="ml-2">
            Download Filtered CSV
          </Button>
        )}
        {filteredData.length > 0 && (
          <div className="mt-6">
            <h2 className="text-lg font-bold mb-4">Filtered Call Logs</h2>
            <pre className="text-sm">{JSON.stringify(filteredData, null, 2)}</pre>
          </div>
        )}
        <div className="space-y-8 mt-6">
          {(filteredData.length > 0 ? filteredData : recentCalls).map(
            (call, index) => (
              <div className="flex items-center" key={index}>
                <Avatar className="h-9 w-9">
                  <AvatarImage
                    src={`/placeholder-avatar-${index + 1}.jpg`}
                    alt={call.name ?? "No Name"}
                  />
                  <AvatarFallback>
                    {call["Caller Name"]
                      ? call["Caller Name"]
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                      : "NA"}
                  </AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {call["Caller Name"] ?? "Unknown Caller"}
                  </p>
                  <p className="text-sm">
                    {call["Caller ID"]} - {call["Duration"]} seconds
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      </CardContent>
    </Card>
  );
};