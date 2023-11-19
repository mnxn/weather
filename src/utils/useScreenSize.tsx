import { useTheme, useMediaQuery } from "@mui/material";

interface ScreenWidth {
  isMobileScreen: boolean;
  isXMobileScreen: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

export function useScreenSize(): ScreenWidth {
  const theme = useTheme();

  const isMobileScreen: boolean = useMediaQuery(theme.breakpoints.down("md"));
  const isXMobileScreen: boolean = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet: boolean = useMediaQuery(
    theme.breakpoints.between("sm", "md")
  );
  const isDesktop: boolean = useMediaQuery(theme.breakpoints.up("lg"));

  return { isMobileScreen, isXMobileScreen, isTablet, isDesktop };
}