import { ChartOptions } from "chart.js";
import { Pie } from "react-chartjs-2";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

interface PieChartContainerProps {
  title: string;
  labels: string[];
  data: number[];
  options: ChartOptions;
}

export const PieChartContainer = ({
  title,
  labels,
  data,
  options,
}: PieChartContainerProps) => (
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
      <Pie
        data={{
          labels,
          datasets: [
            {
              data,
              backgroundColor: [
                "rgba(255, 206, 86, 0.7)", // Sunny
                "rgba(75, 192, 192, 0.7)", // Rainy
                "rgba(54, 162, 235, 0.7)", // Cloudy
              ],
              borderColor: [
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(54, 162, 235, 1)",
              ],
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