"use client"

import { TrendingUp } from "lucide-react"
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"

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

export const description = "A radar chart with dots"

export function RadialChart({June, July, August, September,October,November}) {

    const chartData = [{ month: "Jun", calls: June },
        { month: "Jul",calls: July },
        { month: "Aug", calls: August },
        { month: "Sept", calls: September },
        { month: "Oct", calls: October },
        { month: "Nov", calls: November },]

    const chartConfig = {
        desktop: {
            label: "calls",
            color: "hsl(var(--chart-1))",
        },
        }
        
  return (
    <Card>
      <CardHeader className="items-center">
        <CardTitle>Montly Call Radar</CardTitle>
        <CardDescription>
          Showing total calls for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <RadarChart data={chartData} outerRadius="80%">
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis
              dataKey="month"
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => value}
            />
            <PolarGrid />
            <Radar
              dataKey="calls"
              fill="var(--color-desktop)"
              fillOpacity={0.6}
              dot={{
                r: 4,
                fillOpacity: 1,
              }}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="flex items-center gap-2 leading-none text-muted-foreground">
          June - November 2024
        </div>
      </CardFooter>
    </Card>
  )
}