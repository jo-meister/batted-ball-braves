import xlsx from "xlsx";
import BattedBall from "@/components/batted-ball";
import PlayerDashboard from "@/components/player-dashboard";

// Get data from excel file
const workbook = xlsx.readFile("./public/BattedBallData.xlsx");
const sheetName = workbook.SheetNames[0];
const data: Array<BattedBall> = xlsx.utils.sheet_to_json(
  workbook.Sheets[sheetName]
);

// Declare Maps where key is player name and value is an array of their batted balls
const batterMap: Map<string, Array<BattedBall>> = new Map();
const pitcherMap: Map<string, Array<BattedBall>> = new Map();

// Add each batted ball to the respective batter's and pitcher's list
for (const battedBall of data) {
  // Add a "BASES_GAINED" property for chart
  switch (battedBall.PLAY_OUTCOME) {
    case "Out":
      battedBall.BASES_GAINED = 0;
      break;
    case "Error":
      battedBall.BASES_GAINED = 0;
      break;
    case "Single":
      battedBall.BASES_GAINED = 1;
      break;
    case "Double":
      battedBall.BASES_GAINED = 2;
      break;
    case "Triple":
      battedBall.BASES_GAINED = 3;
      break;
    case "HomeRun":
      battedBall.BASES_GAINED = 4;
      break;
  }

  // Format a new "DATE" property
  const date = new Date((battedBall.GAME_DATE - 25569) * 86400 * 1000);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  battedBall.DATE = `${month.toString()}/${day.toString()}/${year.toString()}`;

  // Add batted ball to a player's list or create a list for new player
  const batterArr = batterMap.get(battedBall.BATTER);
  if (batterArr) {
    batterArr.push(battedBall);
    batterMap.set(battedBall.BATTER, batterArr);
  } else {
    batterMap.set(battedBall.BATTER, [battedBall]);
  }
  const pitcherArr = pitcherMap.get(battedBall.PITCHER);
  if (pitcherArr) {
    pitcherArr.push(battedBall);
    pitcherMap.set(battedBall.PITCHER, pitcherArr);
  } else {
    pitcherMap.set(battedBall.PITCHER, [battedBall]);
  }
}

// Serialize maps to pass as props to client component
const serializedBatters = JSON.stringify(Object.fromEntries(batterMap));
const serializedPitchers = JSON.stringify(Object.fromEntries(pitcherMap));

export default function Home() {
  return (
    <main>
      <PlayerDashboard
        batters={serializedBatters}
        pitchers={serializedPitchers}
      />
    </main>
  );
}
