import React, { useState } from "react";
import TextField from "@mui/material/TextField";
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
    <Autocomplete
      clearOnBlur={true}
      blurOnSelect={true}
      noOptionsText="No cities found"
      options={options}
      getOptionLabel={(city) => city.name}
      groupBy={(city) => city.country ?? ""}
      onChange={(_event, city) => {
        if (city) {
          setWeatherLocation({
            city: city.name,
            state: city.admin1,
            country: city.country,
            latitude: city.latitude,
            longitude: city.longitude,
            elevation: city.elevation,
          });
        }
      }}
      onInputChange={(_event, value) => fetchData(value)}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      filterSelectedOptions={false}
      filterOptions={(x) => x} // show all results from server
      renderOption={(props, city) => (
        <li {...props} key={city.id}>
          {city.name}
          {city.admin1 && `, ${city.admin1}`}
        </li>
      )}
      renderInput={(props) => <TextField {...props} label="Search" fullWidth />}
    />
  );
};

export default SearchInput;
