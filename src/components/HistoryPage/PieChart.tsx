import {
  Chart as ChartJS,
  ChartOptions,
  ArcElement,
  Tooltip,
  PieController,
  Legend,
} from "chart.js";
import { Pie } from "react-chartjs-2";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
ChartJS.register(ArcElement, Tooltip, PieController, Legend);

interface PieChartContainerProps {
  title: string;
  labels: string[];
  data: number[];
  options?: ChartOptions<"pie">;
}

export const PieChartContainer = ({
  title,
  labels,
  data,
  options,
}: PieChartContainerProps) => {
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
  );
};
