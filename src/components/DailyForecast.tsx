import { Box, Divider, Paper, Stack, Tooltip } from "@mui/material";
import { blue, red } from "@mui/material/colors";

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
        <Stack direction="row" gap={1} marginBlock={1} alignItems="center">
          <Tooltip title="High Temperature">
            <Box fontWeight="bold" color={red[500]}>
              {props.high}&deg;
            </Box>
          </Tooltip>
          <Divider orientation="vertical" flexItem />
          <Tooltip title="Low Temperature">
            <Box fontWeight="bold" color={blue[500]}>
              {props.low}&deg;
            </Box>
          </Tooltip>
        </Stack>
      </Stack>
    </Paper>
  );
}

export default DailyForecast;
