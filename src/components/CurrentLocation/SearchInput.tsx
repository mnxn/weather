import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { Autocomplete, debounce } from "@mui/material";
import { CityLocation, fetchCityLocations } from "../../api/OpenMeteo";
import { WeatherLocationProps } from "../../WeatherLocation";

const SearchInput = ({ setWeatherLocation }: WeatherLocationProps) => {
  const [options, setOptions] = useState<CityLocation[]>([]);

  const fetchData = React.useMemo(
    () =>
      debounce(async (searchTerm: string) => {
        const data = await fetchCityLocations(searchTerm);
        data.sort(
          (a, b) =>
            a.country?.localeCompare(b.country ?? "") ||
            a.name.localeCompare(b.name) ||
            a.admin1?.localeCompare(b.admin1 ?? "") ||
            0
        );
        setOptions(data);
      }, 500),
    []
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "row" }}>
      <Autocomplete
        value={options.length >= 1 ? options[0] : null}
        fullWidth
        noOptionsText="No cities found"
        options={options}
        getOptionLabel={(city) => city.name}
        groupBy={(city) => city.country ?? ""}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        onChange={(_event, city) => {
          if (city) {
            setWeatherLocation({
              city: city.name,
              state: city.admin1,
              country: city.country,
              latitude: city.latitude,
              longitude: city.longitude,
            });
          }
        }}
        onInputChange={(_event, value) => fetchData(value)}
        renderOption={(props, city) => (
          <li {...props} key={city.id}>
            {city.name}
            {city.admin1 && `, ${city.admin1}`}
          </li>
        )}
        renderInput={(props) => <TextField {...props} label="City" fullWidth />}
      />
    </Box>
  );
};

export default SearchInput;
