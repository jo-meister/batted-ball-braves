"use client";

import { Card, BarChart, Title, Text } from "@tremor/react";
import BattedBall from "@/components/batted-ball";

const customTooltip = ({ payload, active }) => {
  if (!active || !payload) return null;
  return (
    <div className="w-56 rounded-tremor-default text-tremor-default bg-tremor-background p-2 shadow-tremor-dropdown border border-tremor-border">
      {payload.map((category, idx) => (
        <div key={idx} className="flex flex-1 space-x-2.5">
          <div
            className={`w-1 flex flex-col bg-${category.color}-500 rounded`}
          />
          <ul className="font-medium text-tremor-content-emphasis">
            <li>Outcome: {category.payload.PLAY_OUTCOME}</li>
            <li>Batter: {category.payload.BATTER}</li>
            <li>Pitcher: {category.payload.PITCHER}</li>
            <li>Launch angle: {category.payload.LAUNCH_ANGLE}</li>
            <li>Exit speed: {category.payload.EXIT_SPEED}</li>
            <li>Exit direction: {category.payload.EXIT_DIRECTION}</li>
            <li>Hit distance: {category.payload.HIT_DISTANCE}</li>
            <li>Hang time: {category.payload.HANG_TIME}</li>
            <li>Hit spin rate: {category.payload.HIT_SPIN_RATE}</li>
          </ul>
        </div>
      ))}
    </div>
  );
};

export default function HitChart(props: { battedBalls: Array<BattedBall> }) {
  return (
    <Card>
      <Title>Bases Gained</Title>
      <Text>Hover to see batted ball stats</Text>
      <BarChart
        className="mt-4 h-80"
        data={props.battedBalls}
        categories={["BASES_GAINED"]}
        index="DATE"
        yAxisWidth={60}
        customTooltip={customTooltip}
        showLegend={false}
        maxValue={4}
        minValue={0}
      />
    </Card>
  );
}
