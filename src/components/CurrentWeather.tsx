import { Box } from "@mui/material";

function CurrentWeather(props: { id?: string }) {
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
      Current Weather
    </Box>
  );
}

export default CurrentWeather;
