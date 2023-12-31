import { useMediaQuery, useTheme } from "@mui/material";

interface ScreenWidth {
  isMobileScreen: boolean;
  isXMobileScreen: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}
// Custom hook for determining screen size using MUI breakpoints
export function useScreenSize(): ScreenWidth {
  const theme = useTheme();

  // Use MUI's useMediaQuery hook to check if the screen is below the "md" breakpoint
  const isMobileScreen: boolean = useMediaQuery(theme.breakpoints.down("md"));
  const isXMobileScreen: boolean = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet: boolean = useMediaQuery(
    theme.breakpoints.between("sm", "md"),
  );
  const isDesktop: boolean = useMediaQuery(theme.breakpoints.up("lg"));

  return { isMobileScreen, isXMobileScreen, isTablet, isDesktop };
}
