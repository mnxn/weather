import { Box, Paper, Stack } from "@mui/material";
import { blue } from "@mui/material/colors";

import HighLowTemps from "./HighLowTemps";
import { WmoCode, weatherDescription, weatherIconClass } from "./WmoCode";

export interface DailyForecastProps {
  date: string;
  weather: WmoCode;
  high: number;
  low: number;
}

function DailyForecast(props: DailyForecastProps) {
  // Include time so the constructor does not convert timezones.
  const date = new Date(`${props.date}T00:00`);

  return (
    <Paper elevation={1} sx={{ flex: 1 }}>
      <Stack alignItems="center" textAlign="center" paddingBlock={1}>
        {date.getDate()}
        <h3 style={{ margin: 0 }}>
          {date.toLocaleString(undefined, {
            weekday: "long",
          })}
        </h3>
        <Box
          className={`wi ${weatherIconClass(props.weather)}`}
          fontSize={50}
          alignSelf="stretch"
          bgcolor={blue[100]}
          color="black"
          textAlign="center"
          paddingBlock={2}
          marginBlock={1}
        />
        <Box>{weatherDescription(props.weather)}</Box>
        <Box marginBlock={1}>
          <HighLowTemps high={props.high} low={props.low} />
        </Box>
      </Stack>
    </Paper>
  );
}

export default DailyForecast;
