import { Paper, ToggleButton, ToggleButtonGroup } from "@mui/material";

export interface Units {
  temperature: "C" | "F";
}

export interface UnitProps {
  units: Units;
  setUnits: (units: Units) => void;
}

export function UnitButton({ units, setUnits }: UnitProps) {
  return (
    <Paper elevation={0}>
      <ToggleButtonGroup
        exclusive
        color="info"
        value={units.temperature}
        onChange={(_, value: "C" | "F" | null) => {
          if (value !== null) {
            setUnits({ ...units, temperature: value });
          }
        }}
        aria-label="Temperature Unit"
      >
        <ToggleButton value="C" aria-label="Celsius" sx={{ paddingBlock: 1 }}>
          &deg;C
        </ToggleButton>
        <ToggleButton
          value="F"
          aria-label="Fahrenheit"
          sx={{ paddingBlock: 1 }}
        >
          &deg;F
        </ToggleButton>
      </ToggleButtonGroup>
    </Paper>
  );
}
