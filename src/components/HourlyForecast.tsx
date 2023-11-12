import { Box, Paper, alpha } from "@mui/material";
import { blue, common, red } from "@mui/material/colors";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Filler,
  Tooltip,
} from "chart.js";

ChartJS.register(
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Filler,
  Tooltip
);

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    temperature: {
      type: "linear" as const,
      display: true,
      position: "left" as const,
    },
    percent: {
      type: "linear" as const,
      display: true,
      position: "right" as const,
      grid: {
        drawOnChartArea: false,
      },
      min: 0,
      max: 100,
      ticks: {
        callback(value: unknown): string {
          return `${value}%`;
        },
      },
    },
  },
};

export type HourlyForecast = {
  times: string[];
  temperature: number[];
  humidity: number[];
  precipitation: number[];
  id?: string;
};

function HourlyForecast(props: HourlyForecast) {
  const data = {
    labels: props.times,
    datasets: [
      {
        label: "Temperature",
        data: props.temperature,
        borderColor: red[500],
        backgroundColor: red[500],
        yAxisID: "temperature",
      },
      {
        label: "Humidity",
        data: props.humidity,
        borderColor: common.black,
        backgroundColor: common.black,
        yAxisID: "percent",
      },
      {
        label: "Precipitation Probability",
        data: props.precipitation,
        borderColor: blue[500],
        backgroundColor: alpha(blue[500], 0.35),
        yAxisID: "percent",
        fill: true,
      },
    ],
  };

  return (
    <Paper id={props.id} elevation={1}>
      <Box height={300} padding={2}>
        <Line
          data={data}
          options={chartOptions}
          style={{ position: "absolute" }}
        ></Line>
      </Box>
    </Paper>
  );
}

export default HourlyForecast;
