import { WeatherLocationProps } from "../../WeatherLocation";
import SearchInput from "./SearchInput";
import Box from "@mui/material/Box";

export interface CurrentLocationProps extends WeatherLocationProps {
  id?: string;
}

function CurrentLocation({
  id,
  weatherLocation,
  setWeatherLocation,
}: CurrentLocationProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "white",
        borderRadius: 1,
        padding: 2,
      }}
      id={id}
    >
      <SearchInput
        weatherLocation={weatherLocation}
        setWeatherLocation={setWeatherLocation}
      />
    </Box>
  );
}

export default CurrentLocation;
