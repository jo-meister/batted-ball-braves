"use client";

import { useState } from "react";
import { Grid, Col, SearchSelect, SearchSelectItem } from "@tremor/react";
import PlayerOutcomes from "@/components/player-outcomes";
import KpiCardGrid from "@/components/kpi-card";
import HitChart from "@/components/hit-chart";

export default function PlayerDashboard(props: {
  batters: string;
  pitchers: string;
}) {
  // Define state for components
  const [batterName, setBatterName] = useState("");
  const [pitcherName, setPitcherName] = useState("");

  // Define player objects for components
  const batterMap = JSON.parse(props.batters);
  const pitcherMap = JSON.parse(props.pitchers);
  let batters: Array<string> = Object.keys(batterMap);
  let pitchers: Array<string> = Object.keys(pitcherMap);

  // Filter selectable pitchers for selected batters
  if (batterName) {
    const batterData = batterMap[batterName];
    const pitcherSet: Set<string> = new Set();
    for (const battedBall of batterData) {
      pitcherSet.add(battedBall.PITCHER);
    }
    pitchers = Array.from(pitcherSet);
  }

  // Filter selectable batters for selected pitcher
  if (pitcherName) {
    const pitcherData = pitcherMap[pitcherName];
    const batterSet: Set<string> = new Set();
    for (const battedBall of pitcherData) {
      batterSet.add(battedBall.BATTER);
    }
    batters = Array.from(batterSet);
  }

  // Filter data to display for selected player(s)
  let displayData = [];
  if (batterName && pitcherName) {
    const batterData = batterMap[batterName];
    for (const battedBall of batterData) {
      if (battedBall.PITCHER == pitcherName) {
        displayData.push(battedBall);
      }
    }
  } else if (batterName) {
    displayData = batterMap[batterName];
  } else if (pitcherName) {
    displayData = pitcherMap[pitcherName];
  }

  // Calculate KPIs for selected player(s)
  let avgLaunchAngle = 0;
  let avgExitSpeed = 0;
  let avgExitDirection = 0;
  let avgHitDistance = 0;
  let avgHangTime = 0;
  let avgHitSpinRate = 0;
  let totalBattedBalls = 0;
  let totalOuts = 0;
  let totalErrors = 0;
  let totalSingles = 0;
  let totalDoubles = 0;
  let totalTriples = 0;
  let totalHomeRuns = 0;
  for (const battedBall of displayData) {
    totalBattedBalls += 1;
    avgLaunchAngle += battedBall.LAUNCH_ANGLE;
    avgExitSpeed += battedBall.EXIT_SPEED;
    avgExitDirection += battedBall.EXIT_DIRECTION;
    avgHitDistance += battedBall.HIT_DISTANCE;
    avgHangTime += battedBall.HANG_TIME;
    avgHitSpinRate += battedBall.HIT_SPIN_RATE;
    switch (battedBall.PLAY_OUTCOME) {
      case "Out":
        totalOuts += 1;
        break;
      case "Error":
        totalErrors += 1;
        break;
      case "Single":
        totalSingles += 1;
        break;
      case "Double":
        totalDoubles += 1;
        break;
      case "Triple":
        totalTriples += 1;
        break;
      case "HomeRun":
        totalHomeRuns += 1;
        break;
    }
  }
  avgLaunchAngle /= totalBattedBalls;
  avgExitSpeed /= totalBattedBalls;
  avgExitDirection /= totalBattedBalls;
  avgHitDistance /= totalBattedBalls;
  avgHangTime /= totalBattedBalls;
  avgHitSpinRate /= totalBattedBalls;
  const playOutcomes = [
    {
      outcome: "Out",
      total: totalOuts,
    },
    {
      outcome: "Error",
      total: totalErrors,
    },
    {
      outcome: "Single",
      total: totalSingles,
    },
    {
      outcome: "Double",
      total: totalDoubles,
    },
    {
      outcome: "Triple",
      total: totalTriples,
    },
    {
      outcome: "Home Run",
      total: totalHomeRuns,
    },
  ];

  return (
    <div className="flex ">
      <div className="max-w-sm mx-auto pt-8 pl-8">
        <h2 className="">Select Batter</h2>
        <SearchSelect
          placeholder="Search players..."
          value={batterName}
          onValueChange={setBatterName}
        >
          {batters.map((player, index) => (
            <SearchSelectItem key={index} value={player}>
              {player}
            </SearchSelectItem>
          ))}
        </SearchSelect>
        <h2 className="pt-4">Select Pitcher</h2>
        <SearchSelect
          placeholder="Search players..."
          value={pitcherName}
          onValueChange={setPitcherName}
        >
          {pitchers.map((player, index) => (
            <SearchSelectItem key={index} value={player}>
              {player}
            </SearchSelectItem>
          ))}
        </SearchSelect>
        <h2 className="pt-4">Play Outcomes</h2>
        <PlayerOutcomes playOutcomes={playOutcomes} />
      </div>
      <Grid
        numItems={1}
        numItemsSm={2}
        numItemsMd={3}
        numItemsLg={6}
        className="w-full p-8 pt-14 gap-4"
      >
        <KpiCardGrid metric={"AVG Launch Angle"} value={avgLaunchAngle} />
        <KpiCardGrid metric={"AVG Exit Speed"} value={avgExitSpeed} />
        <KpiCardGrid metric={"AVG Exit Direction"} value={avgExitDirection} />
        <KpiCardGrid metric={"AVG Hit Distance"} value={avgHitDistance} />
        <KpiCardGrid metric={"AVG Hang Time"} value={avgHangTime} />
        <KpiCardGrid metric={"AVG Hit Spin Rate"} value={avgHitSpinRate} />
        <Col numColSpan={1} numColSpanSm={2} numColSpanMd={3} numColSpanLg={6}>
          <HitChart battedBalls={displayData} />
        </Col>
      </Grid>
    </div>
  );
}
