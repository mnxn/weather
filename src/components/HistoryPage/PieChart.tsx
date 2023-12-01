import {
  ArcElement,
  Chart as ChartJS,
  ChartOptions,
  Legend,
  PieController,
  Tooltip,
} from "chart.js";
import { Pie } from "react-chartjs-2";

import { Paper, Typography } from "@mui/material";
import Box from "@mui/material/Box";

ChartJS.register(ArcElement, Tooltip, PieController, Legend);

interface PieChartContainerProps {
  title: string;
  ariaLabel?: string;
  labels: string[];
  data: number[];
  options?: ChartOptions<"pie">;
}

export function PieChartContainer({
  title,
  ariaLabel,
  labels,
  data,
  options,
}: PieChartContainerProps) {
  const chartOptions: ChartOptions<"pie"> = {
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
          <Pie
            aria-label={ariaLabel}
            data={{
              labels,
              datasets: [
                {
                  data,
                  backgroundColor: ["#F4E869", "#5CD2E6", "#B4B4B3"],
                  borderWidth: 1,
                },
              ],
            }}
            options={chartOptions}
            style={{ position: "absolute" }}
          />
        </Box>
      </Box>
    </Paper>
  );
}
