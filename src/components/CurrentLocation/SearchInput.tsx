import React, { MutableRefObject, useState } from "react";

import { Autocomplete, debounce } from "@mui/material";
import TextField from "@mui/material/TextField";

import {
  WeatherLocationProps,
  getFullCountryName,
} from "../../WeatherLocation";
import { CityLocation, fetchCityLocations } from "../../api/OpenMeteo";

function normalizeCities(cities: CityLocation[]): void {
  // Rewrite country field for consistency with weather locations acquired
  // through other methods in the application.
  for (const city of cities) {
    city.country = getFullCountryName(city.country_code, city.country);
  }

  // Sort by country, city name, and state. The country field must be sorted
  // first so categories appear properly in the autocomplete results.
  cities.sort((a, b) => {
    let difference = a.country?.localeCompare(b.country ?? "") ?? 0;
    if (difference === 0) {
      difference = a.name.localeCompare(b.name);
    }
    if (difference === 0) {
      difference = a.admin1?.localeCompare(b.admin1 ?? "") ?? 0;
    }
    return difference;
  });
}

export interface SearchRefProps {
  searchRef: MutableRefObject<HTMLInputElement | null>;
}

export default function SearchInput({
  searchRef,
  setWeatherLocation,
}: SearchRefProps & WeatherLocationProps) {
  const [options, setOptions] = useState<CityLocation[]>([]);

  const fetchData = React.useMemo(
    () =>
      debounce(async (searchTerm: string) => {
        const data = await fetchCityLocations(searchTerm);
        normalizeCities(data);
        setOptions(data);
      }, 500),
    [],
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
      onInputChange={(_event, value) => void fetchData(value)}
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
          inputRef={searchRef}
          label="Search"
          placeholder="City, Country"
          fullWidth
        />
      )}
    />
  );
}
