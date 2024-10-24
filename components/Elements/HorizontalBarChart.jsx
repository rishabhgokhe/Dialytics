"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A mixed bar chart"

     

export function HorizontalBarChart({ incomingCalls, abandoned, voicemail, connected }) {

    const chartData = [
        { field: "Incoming Calls", calls: incomingCalls, fill: "var(--color-chrome)" },
        { field: "Outgoing Calls", calls: abandoned, fill: "var(--color-safari)" },
        { field: "Abandoned", calls: abandoned, fill: "var(--color-firefox)" },
        { field: "Voice mail", calls: voicemail, fill: "var(--color-edge)" },
        { field: "connected", calls: connected, fill: "var(--color-other)" },
        
      ]

      const chartConfig = {
        calls: {
          label: "calls",
        },
        chrome: {
          label: "Chrome",
          color: "hsl(var(--chart-1))",
        },
        safari: {
          label: "Safari",
          color: "hsl(var(--chart-2))",
        },
        firefox: {
          label: "Firefox",
          color: "hsl(var(--chart-3))",
        },
        edge: {
          label: "Edge",
          color: "hsl(var(--chart-4))",
        },
        other: {
          label: "Other",
          color: "hsl(var(--chart-5))",
        },
      } 
      

  return (
    <Card>
      <CardHeader>
        <CardTitle>Call Chart</CardTitle>
        
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 20,
            }}
          >
            <YAxis
              dataKey="field"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value ]?.label || value
              }
            />
            <XAxis dataKey="calls" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="calls" layout="vertical" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}