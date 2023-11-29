import { MutableRefObject } from "react";

import { Place } from "@mui/icons-material";
import { Button } from "@mui/material";

import {
  WeatherLocationProps,
  getShortLocationTitle,
} from "../WeatherLocation";
import { useScreenSize } from "../utils/useScreenSize";

export interface SearchRefProps {
  searchRef: MutableRefObject<HTMLInputElement | null>;
}

export function LocationJumpButton({
  searchRef,
  weatherLocation,
}: SearchRefProps & WeatherLocationProps) {
  const { isXMobileScreen } = useScreenSize();

  return (
    <Button
      color="inherit"
      variant="outlined"
      startIcon={isXMobileScreen ? undefined : <Place />}
      sx={{
        minWidth: 0,
        paddingInline: { xs: 1, sm: 2 },
        paddingBlock: 1,
        marginRight: 1,
      }}
      onClick={() => {
        searchRef.current?.focus();
      }}
    >
      {isXMobileScreen ? <Place /> : getShortLocationTitle(weatherLocation)}
    </Button>
  );
}
