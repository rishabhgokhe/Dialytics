"use client";

import { useState } from "react";
import Papa from "papaparse";

export default function Home() {
  const [filterType, setFilterType] = useState("Incoming");
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFilter = () => {
    setLoading(true);
    fetch("/call_data.csv")
      .then((response) => response.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          complete: (results) => {
            const data = results.data;
            const filtered = data.filter(
              (row) => row["Direction"] && row["Direction"].trim() === filterType
            );
            setFilteredData(filtered);
            setLoading(false);
          },
          error: (err) => {
            console.error("Error parsing CSV: ", err);
            setLoading(false);
          },
        });
      });
  };

  const downloadCSV = () => {
    const csv = Papa.unparse(filteredData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.setAttribute("download", "filtered_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    filteredData
  )
}