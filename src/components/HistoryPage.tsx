import { Box, Container } from "@mui/material";
import SunsetHistory from "./SunsetHistory";
import { useEffect, useState } from "react";
import { SunsetData, fetchSunsetData } from "../api/OpenMeteo";

// Generic function to return every Nth element of an array.
// Can be used to shrink a years worth of daily data to values every N days.
function everyNth<T>(array: T[] | undefined, n: number): T[] {
  if (array === undefined) {
    return [];
  }

  return array.filter((_, index) => index % n == 0);
}

const DAYS: number = 7;

function HistoryPage() {
  const [sunsetData, setSunsetData] = useState<SunsetData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchSunsetData(45.52345, -122.67621, 2022);
      setSunsetData(data);
    };

    fetchData();
  }, []);

  return (
    <Container>
      <Box padding={2}>
        <SunsetHistory
          times={everyNth(sunsetData?.time, DAYS)}
          sunrise={everyNth(sunsetData?.sunrise, DAYS)}
          sunset={everyNth(sunsetData?.sunset, DAYS)}
        />
      </Box>
    </Container>
  );
}

export default HistoryPage;
