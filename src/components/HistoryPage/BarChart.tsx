import {
  BarController,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  ChartOptions,
  Legend,
  LinearScale,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import { Paper, Typography } from "@mui/material";
import Box from "@mui/material/Box";

//import { tooltip } from "leaflet";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  Legend,
  Tooltip,
);

interface BarChartContainerProps {
  title: string;
  ariaLabel?: string;
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
  }[];
  options?: ChartOptions<"bar">;
}

export function BarChartContainer({
  title,
  ariaLabel,
  labels,
  datasets,
  options,
}: BarChartContainerProps) {
  const chartOptions: ChartOptions<"bar"> = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
        display: true,
      },
    },
    animation: {
      duration: 1000,
      easing: "easeInOutQuart",
    },
    ...options,
  };
  return (
    <Paper elevation={1}>
      <Box padding={3} textAlign="center">
        <Typography component="h2" variant="h4" marginBlockEnd={3}>
          {title}
        </Typography>
        <Box height={{ xs: 250, sm: 300, md: 350 }}>
          <Bar
            aria-label={ariaLabel}
            data={{
              labels,
              datasets,
            }}
            options={chartOptions}
            style={{ position: "absolute" }}
          />
        </Box>
      </Box>
    </Paper>
  );
}
