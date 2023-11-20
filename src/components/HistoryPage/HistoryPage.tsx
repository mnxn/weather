import { useEffect, useState } from "react";
import { fetchAllWeather } from "../../api/OpenWeather";
import {
  ChartOptions,
  Chart as ChartJS,
  Title,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
} from "chart.js";
import Box from "@mui/material/Box";
import { FormattedData, formatChartData } from "./CalcHistory";
import { PieChartContainer } from "./PieChart";
import { BarChartContainer } from "./BarChart";

ChartJS.register(
  Title,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement
);

const HistoryPage = () => {
  const [chartData, setChartData] = useState<FormattedData>({
    monthly: {
      labels: [],
      highestTemps: [],
      lowestTemps: [],
    },
    daily: {
      labels: [],
      highestTemps: [],
      lowestTemps: [],
    },
    weatherDistribution: {
      labels: [],
      data: [],
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      const forcastByCity = await fetchAllWeather(45.5152, -122.676483);
      console.log("fetchAllWeather:", forcastByCity);

      const formattedData = formatChartData(forcastByCity);
      setChartData(formattedData);
    };

    fetchData();
  }, []);

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
  };

  return (
    <Box sx={{ p: 6 }}>
      {/* <BarChartContainer
        title="Monthly highest/lowest temperature"
        labels={chartData.monthly.labels}
        highestTemps={chartData.monthly.highestTemps}
        lowestTemps={chartData.monthly.lowestTemps}
        options={chartOptions}
      /> */}
      <BarChartContainer
        title="Highest/lowest temperature"
        labels={chartData.daily.labels}
        highestTemps={chartData.daily.highestTemps}
        lowestTemps={chartData.daily.lowestTemps}
        options={chartOptions}
      />
      <PieChartContainer
        title="Weather Distribution"
        labels={chartData.weatherDistribution.labels}
        data={chartData.weatherDistribution.data}
        options={chartOptions}
      />
    </Box>
  );
};

export default HistoryPage;