import { SxProps, ToggleButton, ToggleButtonGroup, alpha } from "@mui/material";
import { common } from "@mui/material/colors";

export interface Units {
  temperature: "C" | "F";
}

export interface UnitProps {
  units: Units;
  setUnits: (units: Units) => void;
}

const buttonStyle: SxProps = {
  paddingBlock: 1,
  borderColor: common.white,
  color: common.white,
  "&:hover": {
    backgroundColor: alpha(common.white, 0.2),
  },
  "&.Mui-selected": {
    backgroundColor: common.white,
    color: common.black,
    "&:hover": {
      backgroundColor: common.white,
    },
  },
};

export function UnitButton({ units, setUnits }: UnitProps) {
  return (
    <ToggleButtonGroup
      exclusive
      value={units.temperature}
      onChange={(_, value: "C" | "F" | null) => {
        if (value !== null) {
          setUnits({ ...units, temperature: value });
        }
      }}
      aria-label="Temperature Unit"
    >
      <ToggleButton value="C" aria-label="Celsius" sx={buttonStyle}>
        &deg;C
      </ToggleButton>
      <ToggleButton value="F" aria-label="Fahrenheit" sx={buttonStyle}>
        &deg;F
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
