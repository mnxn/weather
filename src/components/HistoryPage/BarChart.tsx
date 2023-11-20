import { ChartOptions } from "chart.js";
import { Bar } from "react-chartjs-2";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

interface ChartContainerProps {
  title: string;
  labels: string[];
  highestTemps: number[];
  lowestTemps: number[];
  options: ChartOptions;
}

export const BarChartContainer = ({
  title,
  labels,
  highestTemps,
  lowestTemps,
  options,
}: ChartContainerProps) => (
  <Box
    sx={{
      padding: 2,
      mb: 3,
      borderRadius: 2,
      backgroundColor: "white",
    }}
  >
    <Typography variant="h5" sx={{ mb: 3 }}>
      {title}
    </Typography>
    <Box sx={{ height: "350px" }}>
      <Bar
        data={{
          labels,
          datasets: [
            {
              label: `Highest Temperature (°C)`,
              data: highestTemps,
              backgroundColor: "rgba(255, 99, 132, 0.5)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
            },
            {
              label: `Lowest Temperature (°C)`,
              data: lowestTemps,
              backgroundColor: "rgba(54, 162, 235, 0.5)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
            },
          ],
        }}
        options={options}
        style={{ position: "absolute" }}
      />
    </Box>
  </Box>
);