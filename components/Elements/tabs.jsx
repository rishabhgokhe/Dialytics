"use client";

import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";

export default function TabChanger() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="flex justify-center items-center">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-md">
        <TabsList className="grid grid-cols-4">
          {["Overview", "Call Analysics", "Call Metrics", "Reports"].map((tab) => (
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
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
}