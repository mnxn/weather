import { Box, Paper, Typography } from "@mui/material";
import { blue, blueGrey } from "@mui/material/colors";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ChartOptions,
  ChartData,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  TooltipItem,
  TooltipLabelStyle,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

interface TimePoint {
  x: string;
  y: number;
  date: Date;
}

const nightColor = blueGrey[900];
const dayColor = blue[100];

const chartOptions: ChartOptions<"bar"> = {
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    duration: 0,
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      mode: "index", // show information about entire column
      callbacks: {
        label(item: TooltipItem<"bar">) {
          const point = item.raw as TimePoint;
          const formattedTime = point.date.toLocaleString(undefined, {
            hour: "numeric",
            minute: "numeric",
          });

          return `${item.dataset.label}: ${formattedTime}`;
        },
        title(items: TooltipItem<"bar">[]) {
          const point = items[0].raw as TimePoint;
          return point.date.toLocaleString(undefined, {
            month: "long",
            day: "numeric",
          });
        },
        labelColor(tooltipItem: TooltipItem<"bar">): TooltipLabelStyle {
          return {
            backgroundColor:
              tooltipItem.dataset.label === "Sunrise" ? dayColor : nightColor,
            borderColor: dayColor,
            borderRadius: 5,
          };
        },
      },
      filter(item: TooltipItem<"bar">): boolean {
        return item.dataset.label !== "Midnight";
      },
    },
  },
  scales: {
    x: {
      stacked: true,
      ticks: {
        callback(value: string | number): string {
          if (typeof value === "string") return value;

          return new Date(
            `${this.getLabelForValue(value)}T00:00`
          ).toLocaleString(undefined, {
            month: "short",
            day: "numeric",
          });
        },
      },
    },
    y: {
      stacked: false,
      min: 0,
      max: 24,
      ticks: {
        callback(value: string | number): string {
          if (typeof value === "string") return value;

          const date = new Date();
          date.setHours(value);
          return date.toLocaleString(undefined, { hour: "numeric" });
        },
      },
    },
  },
};

export type SunsetHistoryProps = {
  times: string[];
  sunrise: string[];
  sunset: string[];
};

function getTimePoints(labels: string[], data: string[]): TimePoint[] {
  return data.map((time, index) => {
    const date = new Date(time + "Z"); // Z suffix for GMT timezone
    const y = date.getHours() + date.getMinutes() / 60;
    return {
      x: labels[index],
      y,
      date,
    };
  });
}

function SunsetHistory(props: SunsetHistoryProps) {
  const data: ChartData<"bar", TimePoint[]> = {
    labels: props.times,
    datasets: [
      {
        label: "Sunrise",
        data: getTimePoints(props.times, props.sunrise),
        backgroundColor: nightColor,
        categoryPercentage: 1,
        barPercentage: 1,
      },
      {
        label: "Sunset",
        data: getTimePoints(props.times, props.sunset),
        backgroundColor: dayColor,
        categoryPercentage: 1,
        barPercentage: 1,
      },
      {
        label: "Midnight",
        data: Array(props.times.length).fill(24), // 24 hours to fill the entire background
        backgroundColor: nightColor,
        categoryPercentage: 1,
        barPercentage: 1,
      },
    ],
  };

  return (
    <Paper elevation={1}>
      <Box padding={3} textAlign="center">
        <Typography component="h2" variant="h4" marginBlockEnd={1}>
          Sunrise/Sunset Times
        </Typography>
        <Box height={350}>
          <Bar
            data={data}
            options={chartOptions}
            style={{ position: "absolute" }}
          />
        </Box>
      </Box>
    </Paper>
  );
}

export default SunsetHistory;
