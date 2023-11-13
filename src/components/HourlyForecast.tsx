import { Box } from "@mui/material";

function HourlyForecast(props: { id?: string }) {
  return (
    <Box
      id={props.id}
      display="flex"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      bgcolor="white"
      borderRadius={1}
    >
      Hourly Forecast
    </Box>
  );
}

export default HourlyForecast;
