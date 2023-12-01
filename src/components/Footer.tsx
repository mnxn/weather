import { Box, Link, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

import openWeatherIcon from "../assets/OpenWeather.png";

export default function Footer() {
  return (
    <Stack
      component="footer"
      alignItems="center"
      textAlign="center"
      gap={1}
      marginTop={10}
      marginBottom={5}
      color={grey[900]}
    >
      <Stack direction="row" alignItems="center">
        <Link href="https://openweathermap.org/" title="OpenWeather">
          <Box marginBlock={-2}>
            <img
              src={openWeatherIcon}
              alt="OpenWeather Icon"
              width={150}
              height={85}
            />
          </Box>
        </Link>

        <Link href="https://www.weatherapi.com/" title="Free Weather API">
          <img
            src="//cdn.weatherapi.com/v4/images/weatherapi_logo.png"
            alt="Weather data by WeatherAPI.com"
            width={107}
            height={50}
          />
        </Link>
      </Stack>

      <Typography>
        <Link href="https://open-meteo.com/" color="inherit">
          Weather data by Open-Meteo.com
        </Link>{" "}
        <Link
          href="https://creativecommons.org/licenses/by/4.0/"
          color="inherit"
        >
          (CC BY 4.0)
        </Link>
      </Typography>

      <Typography>
        <Link href="https://openweathermap.org/" color="inherit">
          Weather data provided by OpenWeather
        </Link>
      </Typography>

      <Typography>
        Powered by{" "}
        <Link
          href="https://www.weatherapi.com"
          color="inherit"
          title="Weather API"
        >
          WeatherAPI.com
        </Link>
      </Typography>
    </Stack>
  );
}
