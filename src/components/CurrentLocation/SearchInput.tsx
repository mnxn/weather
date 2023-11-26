import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Autocomplete, debounce } from "@mui/material";
import { CityLocation, fetchCityLocations } from "../../api/OpenMeteo";
import {
  WeatherLocationProps,
  getFullCountryName,
} from "../../WeatherLocation";

function normalizeCities(cities: CityLocation[]): void {
  // Rewrite country field for consistency with weather locations acquired
  // through other methods in the application.
  for (let i = 0; i < cities.length; i++) {
    cities[i].country = getFullCountryName(
      cities[i].country_code,
      cities[i].country
    );
  }

  // Sort by country, city name, and state. The country field must be sorted
  // first so categories appear properly in the autocomplete results.
  cities.sort(
    (a, b) =>
      a.country?.localeCompare(b.country ?? "") ||
      a.name.localeCompare(b.name) ||
      a.admin1?.localeCompare(b.admin1 ?? "") ||
      0
  );
}

const SearchInput = ({ setWeatherLocation }: WeatherLocationProps) => {
  const [options, setOptions] = useState<CityLocation[]>([]);

  const fetchData = React.useMemo(
    () =>
      debounce(async (searchTerm: string) => {
        const data = await fetchCityLocations(searchTerm);
        normalizeCities(data);
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
            timeZone: city.timezone,
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
      renderInput={(props) => (
        <TextField
          {...props}
          label="Search"
          placeholder="City, Country"
          fullWidth
        />
      )}
    />
  );
};

export default SearchInput;
