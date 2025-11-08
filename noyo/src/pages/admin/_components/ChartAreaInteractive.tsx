"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import { useIsMobile } from "@/hooks/use-mobile"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

export const description = "An interactive area chart"

const chartData = [
  { date: "2024-04-01", orderCount: 222150 },
  { date: "2024-04-02", orderCount: 97180 },
  { date: "2024-04-03", orderCount: 167120 },
  { date: "2024-04-04", orderCount: 242260 },
  { date: "2024-04-05", orderCount: 373290 },
  { date: "2024-04-06", orderCount: 301340 },
  { date: "2024-04-07", orderCount: 245180 },
  { date: "2024-04-08", orderCount: 409320 },
  { date: "2024-04-09", orderCount: 59110 },
  { date: "2024-04-10", orderCount: 261190 },
  { date: "2024-04-11", orderCount: 327350 },
  { date: "2024-04-12", orderCount: 292210 },
  { date: "2024-04-13", orderCount: 342380 },
  { date: "2024-04-14", orderCount: 137220 },
  { date: "2024-04-15", orderCount: 120170 },
  { date: "2024-04-16", orderCount: 138190 },
  { date: "2024-04-17", orderCount: 446360 },
  { date: "2024-04-18", orderCount: 364410 },
  { date: "2024-04-19", orderCount: 243180 },
  { date: "2024-04-20", orderCount: 89150 },
  { date: "2024-04-21", orderCount: 137200 },
  { date: "2024-04-22", orderCount: 224170 },
  { date: "2024-04-23", orderCount: 138230 },
  { date: "2024-04-24", orderCount: 387290 },
  { date: "2024-04-25", orderCount: 215250 },
  { date: "2024-04-26", orderCount: 75130 },
  { date: "2024-04-27", orderCount: 383420 },
  { date: "2024-04-28", orderCount: 122180 },
  { date: "2024-04-29", orderCount: 315240 },
  { date: "2024-04-30", orderCount: 454380 },
  { date: "2024-05-01", orderCount: 165220 },
  { date: "2024-05-02", orderCount: 293310 },
  { date: "2024-05-03", orderCount: 247190 },
  { date: "2024-05-04", orderCount: 385420 },
  { date: "2024-05-05", orderCount: 481390 },
  { date: "2024-05-06", orderCount: 498520 },
  { date: "2024-05-07", orderCount: 388300 },
  { date: "2024-05-08", orderCount: 149210 },
  { date: "2024-05-09", orderCount: 227180 },
  { date: "2024-05-10", orderCount: 293330 },
  { date: "2024-05-11", orderCount: 335270 },
  { date: "2024-05-12", orderCount: 197240 },
  { date: "2024-05-13", orderCount: 197160 },
  { date: "2024-05-14", orderCount: 448490 },
  { date: "2024-05-15", orderCount: 473380 },
  { date: "2024-05-16", orderCount: 338400 },
  { date: "2024-05-17", orderCount: 499420 },
  { date: "2024-05-18", orderCount: 315350 },
  { date: "2024-05-19", orderCount: 235180 },
  { date: "2024-05-20", orderCount: 177230 },
  { date: "2024-05-21", orderCount: 82140 },
  { date: "2024-05-22", orderCount: 81120 },
  { date: "2024-05-23", orderCount: 252290 },
  { date: "2024-05-24", orderCount: 294220 },
  { date: "2024-05-25", orderCount: 201250 },
  { date: "2024-05-26", orderCount: 213170 },
  { date: "2024-05-27", orderCount: 420460 },
  { date: "2024-05-28", orderCount: 233190 },
  { date: "2024-05-29", orderCount: 78130 },
  { date: "2024-05-30", orderCount: 340280 },
  { date: "2024-05-31", orderCount: 178230 },
  { date: "2024-06-01", orderCount: 178200 },
  { date: "2024-06-02", orderCount: 470410 },
  { date: "2024-06-03", orderCount: 103160 },
  { date: "2024-06-04", orderCount: 439380 },
  { date: "2024-06-05", orderCount: 88140 },
  { date: "2024-06-06", orderCount: 294250 },
  { date: "2024-06-07", orderCount: 323370 },
  { date: "2024-06-08", orderCount: 385320 },
  { date: "2024-06-09", orderCount: 438480 },
  { date: "2024-06-10", orderCount: 155200 },
  { date: "2024-06-11", orderCount: 92150 },
  { date: "2024-06-12", orderCount: 492420 },
  { date: "2024-06-13", orderCount: 81130 },
  { date: "2024-06-14", orderCount: 426380 },
  { date: "2024-06-15", orderCount: 307350 },
  { date: "2024-06-16", orderCount: 371310 },
  { date: "2024-06-17", orderCount: 475520 },
  { date: "2024-06-18", orderCount: 107170 },
  { date: "2024-06-19", orderCount: 341290 },
  { date: "2024-06-20", orderCount: 408450 },
  { date: "2024-06-21", orderCount: 169210 },
  { date: "2024-06-22", orderCount: 317270 },
  { date: "2024-06-23", orderCount: 480530 },
  { date: "2024-06-24", orderCount: 132180 },
  { date: "2024-06-25", orderCount: 141190 },
  { date: "2024-06-26", orderCount: 434380 },
  { date: "2024-06-27", orderCount: 448490 },
  { date: "2024-06-28", orderCount: 149200 },
  { date: "2024-06-29", orderCount: 103160 },
  { date: "2024-06-30", orderCount: 446400 },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  desktop: {
    label: "Total Orders",
    color: "var(--primary)",
  },
} satisfies ChartConfig

export function ChartAreaInteractive() {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState("90d")

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d")
    }
  }, [isMobile])

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2024-06-30")
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Total Orders</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Total for the last 3 months
          </span>
          <span className="@[540px]/card:hidden">Last 3 months</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
          >
            <ToggleGroupItem value="90d">Last 3 months</ToggleGroupItem>
            <ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>
            <ToggleGroupItem value="7d">Last 7 days</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Last 3 months
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={1.0}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="orderCount"
              type="natural"
              fill="url(#fillDesktop)"
              stroke="var(--color-desktop)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
