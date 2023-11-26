import {
  BarElement,
  CategoryScale,
  ChartData,
  Chart as ChartJS,
  ChartOptions,
  LinearScale,
  Tooltip,
  TooltipItem,
  TooltipLabelStyle,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import { Box, Paper, Typography } from "@mui/material";
import { blue, blueGrey } from "@mui/material/colors";

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
  interaction: {
    // highlight the entire column of sunrise, sunset, and midnight segments
    mode: "x",
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      // show tooltip information about entire column
      mode: "index",
      callbacks: {
        // read the original date value to display the local time of day
        label(item: TooltipItem<"bar">) {
          const point = item.raw as TimePoint;
          const formattedTime = point.date.toLocaleString(undefined, {
            hour: "numeric",
            minute: "numeric",
          });

          return `${item.dataset.label}: ${formattedTime}`;
        },

        // only show month and day for the tooltip header
        title(items: TooltipItem<"bar">[]) {
          if (items.length === 0) return undefined;

          const point = items[0].raw as TimePoint;
          return point.date.toLocaleString(undefined, {
            month: "long",
            day: "numeric",
          });
        },

        // reverse segment colors so sunrise has the light color and sunset has the dark color
        labelColor(tooltipItem: TooltipItem<"bar">): TooltipLabelStyle {
          return {
            backgroundColor:
              tooltipItem.dataset.label === "Sunrise" ? dayColor : nightColor,
            borderColor: dayColor,
            borderRadius: 5,
          };
        },
      },

      // disable tooltip information about the midnight segment because it does not store a date object
      filter(item: TooltipItem<"bar">): boolean {
        return item.dataset.label !== "Midnight";
      },
    },
  },
  scales: {
    x: {
      stacked: true,
      ticks: {
        // only show month and day along x axis
        callback(value: string | number): string {
          if (typeof value === "string") return value;

          return new Date(
            `${this.getLabelForValue(value)}T00:00`,
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
        // only show time of day along y axis
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
  timezone: string;
  times: string[];
  sunrise: string[];
  sunset: string[];
};

function getTimePoints(
  timeZone: string,
  labels: string[],
  data: string[],
): TimePoint[] {
  return data.map((time, index) => {
    // Use the "Z" suffix for original GMT timezone and convert to local date
    // and time based on the time zone.
    const localDateString = new Date(time + "Z").toLocaleString(undefined, {
      timeZone,
    });
    const date = new Date(localDateString);

    // transform time of day to a decimal value between 0 and 24
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
        data: getTimePoints(props.timezone, props.times, props.sunrise),
        backgroundColor: nightColor,
        categoryPercentage: 1,
        barPercentage: 1,
      },
      {
        label: "Sunset",
        data: getTimePoints(props.timezone, props.times, props.sunset),
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
