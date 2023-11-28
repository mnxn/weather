import {
  CategoryScale,
  ChartData,
  Chart as ChartJS,
  ChartOptions,
  Filler,
  LineController,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
  TooltipItem,
} from "chart.js";
import { useState } from "react";
import { Line } from "react-chartjs-2";

import { ShowChart } from "@mui/icons-material";
import { Box, Chip, Paper, Stack, alpha } from "@mui/material";
import { blue, common, red } from "@mui/material/colors";

ChartJS.register(
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Filler,
  Tooltip,
);

const chartOptions: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        // Show day of the month in the tooltip title.
        // For example: Monday, January 1
        title(items: TooltipItem<"line">[]) {
          if (items.length === 0) return;

          const date = new Date(items[0].label);
          return date.toLocaleString(undefined, {
            month: "short",
            day: "numeric",
            hour: "numeric",
          });
        },
      },
    },
  },
  scales: {
    x: {
      ticks: {
        // Only show one label per day.
        callback(value: number | string): string | undefined {
          if (typeof value === "string") return value;

          const date = new Date(this.getLabelForValue(value));
          if (date.getHours() === 0) {
            return date.toLocaleString(undefined, {
              month: "short",
              day: "numeric",
            });
          }
        },
      },
    },
    temperature: {
      type: "linear" as const,
      display: true,
      position: "left" as const,
      ticks: {
        callback(value: string | number): string {
          return `${value}°`;
        },
      },
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
        callback(value: string | number): string {
          return `${value}%`;
        },
      },
    },
  },
};

export interface HourlyForecastProps {
  times: string[];
  temperature: number[];
  humidity: number[];
  precipitation: number[];
}

interface DataSelectorChipProps {
  label: string;
  color: string;
  enabled: boolean;
  setEnabled: (value: boolean) => void;
}

function DataSelectorChip(props: DataSelectorChipProps) {
  return (
    <Chip
      label={props.label}
      variant={props.enabled ? "filled" : "outlined"}
      icon={
        props.enabled ? (
          // The icon color only changes if specificity is increased with "&&"
          // See https://github.com/mui/material-ui/issues/26676
          <ShowChart sx={{ "&&": { color: props.color } }} />
        ) : undefined
      }
      onClick={() => {
        props.setEnabled(!props.enabled);
      }}
    />
  );
}

function HourlyForecast(props: HourlyForecastProps) {
  const [temperatureEnabled, setTemperatureEnabled] = useState(true);
  const [humidityEnabled, setHumidityEnabled] = useState(true);
  const [precipitationEnabled, setPrecipitationEnabled] = useState(true);

  const data: ChartData<"line"> = {
    labels: props.times,
    datasets: [
      {
        label: "Temperature",
        data: props.temperature,
        borderColor: red[500],
        backgroundColor: red[500],
        yAxisID: "temperature",
        pointStyle: false,
        hidden: !temperatureEnabled,
      },
      {
        label: "Humidity",
        data: props.humidity,
        borderColor: common.black,
        backgroundColor: common.black,
        yAxisID: "percent",
        pointStyle: false,
        hidden: !humidityEnabled,
      },
      {
        label: "Precipitation Probability",
        data: props.precipitation,
        borderColor: blue[500],
        backgroundColor: alpha(blue[500], 0.35),
        yAxisID: "percent",
        pointStyle: false,
        hidden: !precipitationEnabled,
        fill: true,
      },
    ],
  };

  return (
    <Paper elevation={1}>
      <Box padding={{ xs: 1, sm: 2 }}>
        <Box height={{ xs: 200, sm: 250, md: 300 }}>
          <Line
            data={data}
            options={chartOptions}
            style={{ position: "absolute" }}
          />
        </Box>

        <Stack
          direction="row"
          flexWrap="wrap"
          width="100%"
          justifyContent="center"
          gap={{ xs: 1, sm: 2 }}
          marginBlock={1}
        >
          <DataSelectorChip
            label="Temperature"
            color={red[500]}
            enabled={temperatureEnabled}
            setEnabled={setTemperatureEnabled}
          />

          <DataSelectorChip
            label="Relative Humidity"
            color={common.black}
            enabled={humidityEnabled}
            setEnabled={setHumidityEnabled}
          />

          <DataSelectorChip
            label="Precipitation Probability"
            color={blue[500]}
            enabled={precipitationEnabled}
            setEnabled={setPrecipitationEnabled}
          />
        </Stack>
      </Box>
    </Paper>
  );
}

export default HourlyForecast;
