"use client";

import { Card, Metric, Text } from "@tremor/react";

export default function KpiCardGrid(props: { metric: string; value: number }) {
  return (
    <Card>
      <Text>{props.metric}</Text>
      <Metric>{Math.round(props.value * 100) / 100 || "-"}</Metric>
    </Card>
  );
}
