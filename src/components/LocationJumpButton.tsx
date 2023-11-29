import { Place } from "@mui/icons-material";
import { Button } from "@mui/material";

import {
  WeatherLocationProps,
  getShortLocationTitle,
} from "../WeatherLocation";
import { useScreenSize } from "../utils/useScreenSize";
import { LocationFocusProps } from "./CurrentLocation";

export function LocationJumpButton({
  searchRef,
  setLocationExpanded,
  weatherLocation,
}: LocationFocusProps & WeatherLocationProps) {
  const { isXMobileScreen } = useScreenSize();

  return (
    <Button
      color="inherit"
      variant="outlined"
      startIcon={isXMobileScreen ? undefined : <Place />}
      sx={{
        minWidth: 32,
        paddingInline: { xs: 1, sm: 2 },
        paddingBlock: 1,
        marginLeft: "auto",
        marginRight: 1,
      }}
      onClick={() => {
        setLocationExpanded(true);
        // Wait until the current location component has finished expanding
        // before jumping to the search input.
        setTimeout(() => {
          searchRef.current?.focus();
        }, 150);
      }}
    >
      {isXMobileScreen ? <Place /> : getShortLocationTitle(weatherLocation)}
    </Button>
  );
}
