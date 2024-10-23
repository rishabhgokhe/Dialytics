"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A multiple line chart";

const chartData = [
  { month: "January", answered: 1886, unanswered: 2480 },
  { month: "February", answered: 2445, unanswered: 2600 },
  { month: "March", answered: 3711, unanswered: 1290 },
  { month: "April", answered: 1731, unanswered: 1990 },
  { month: "May", answered: 2099, unanswered: 1330 },
  { month: "June", answered: 2134, unanswered: 2940 },
];

const chartConfig = {
  answered: {
    label: "Answered",
    color: "hsl(var(--chart-5))",
  },
  unanswered: {
    label: "Unanswered",
    color: "hsl(var(--chart-2))",
  },
};

export function LineChartGraph() {
  return (
    <Card className="h-auto">
      <CardHeader className="pb-1">

        <CardTitle className="flex justify-between">
          <p className="text-lg">Overall Calls Volume</p>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <div
                className="w-3 h-3 rounded-[3px]"
                style={{ backgroundColor: chartConfig.answered.color }}
              ></div>
              <p className="font-normal">
                {chartConfig.answered.label.toLowerCase()}
              </p>
            </div>
            <div className="flex items-center space-x-1">
              <div
                className="w-3 h-3 rounded-[3px]"
                style={{ backgroundColor: chartConfig.unanswered.color }}
              ></div>
              <p className="font-normal">
                {chartConfig.unanswered.label.toLowerCase()}
              </p>
            </div>
          </div>
        </CardTitle>


      </CardHeader>
      <CardContent className="pb-2">
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 0,
              left: 10,
              right: 10,
              bottom: 0,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={5}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="answered"
              type="monotone"
              stroke={chartConfig.answered.color}
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="unanswered"
              type="monotone"
              stroke={chartConfig.unanswered.color}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="pt-1">
        <div className="flex w-full items-center text-xs">
          <div className="flex items-center gap-1 font-medium">
            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
