import { Bar } from "react-chartjs-2";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ChartOptions,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement);

interface BarChartContainerProps {
  title: string;
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
  }[];
  options?: ChartOptions;
}

export const BarChartContainer = ({
  title,
  labels,
  datasets,
  options,
}: BarChartContainerProps) => {
  const chartOptions: ChartOptions = {
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
        <Bar
          data={{
            labels,
            datasets,
          }}
          options={chartOptions as ChartOptions}
          style={{ position: "absolute" }}
        />
      </Box>
    </Box>
  );
};