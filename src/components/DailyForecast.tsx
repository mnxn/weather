import { Box } from "@mui/material";

function DailyForecast(props: { id?: string }) {
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
      Daily Forecast
    </Box>
  );
}

export default DailyForecast;
