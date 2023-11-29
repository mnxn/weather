import { MutableRefObject } from "react";

import { Place } from "@mui/icons-material";
import { Button } from "@mui/material";

import {
  WeatherLocationProps,
  getShortLocationTitle,
} from "../WeatherLocation";

export interface SearchRefProps {
  searchRef: MutableRefObject<HTMLInputElement | null>;
}

export function LocationJumpButton({
  searchRef,
  weatherLocation,
}: SearchRefProps & WeatherLocationProps) {
  return (
    <Button
      color="inherit"
      variant="outlined"
      startIcon={<Place />}
      sx={{
        paddingBlock: 1,
        marginRight: 1,
        display: { xs: "none", sm: "flex" },
      }}
      onClick={() => {
        searchRef.current?.focus();
      }}
    >
      {getShortLocationTitle(weatherLocation)}
    </Button>
  );
}
