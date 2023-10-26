import { Card, DonutChart } from "@tremor/react";

export default function PlayerOutcomes(props: {
  playOutcomes: Array<{ outcome: string; total: number }>;
}) {
  return (
    <Card className="max-w-sm">
      <DonutChart
        className="mt-6"
        data={props.playOutcomes}
        category="total"
        index="outcome"
      />
    </Card>
  );
}
