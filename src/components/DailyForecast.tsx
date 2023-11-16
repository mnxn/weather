import { Box, Divider, Paper, Stack, Tooltip } from "@mui/material";
import { WmoCode, weatherDescription, weatherIconClass } from "./WmoCode";
import { blue, red } from "@mui/material/colors";

export interface DailyForecastProps {
  date: number;
  day: string;
  weather: WmoCode;
  high: number;
  low: number;
  id?: string;
}

function DailyForecast(props: DailyForecastProps) {
  return (
    <Paper elevation={1} sx={{ flex: 1 }}>
      <Stack
        id={props.id}
        alignItems="center"
        textAlign="center"
        paddingBlock={1}
      >
        {props.date}
        <h3 style={{ margin: 0 }}>{props.day}</h3>
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
