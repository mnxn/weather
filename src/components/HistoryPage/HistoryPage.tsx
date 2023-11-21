import { useEffect, useState } from "react";
import { fetchHistoricalWeatherData } from "../../api/OpenMeteo";
import Box from "@mui/material/Box";
import { FormattedData, formatChartData } from "./CalcHistory";
import { PieChartContainer } from "./PieChart";
import { BarChartContainer } from "./BarChart";


const HistoryPage = () => {
  const [chartData, setChartData] = useState<FormattedData>({
    monthly: {
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
      const weatherData = await fetchHistoricalWeatherData(45.5152, -122.676483, 2023);
      const formattedData = formatChartData(weatherData);
      setChartData(formattedData);
    };

    fetchData();
  }, []);


  return (
    <Box sx={{ p: 6 }}>
      <BarChartContainer
        title="Highest/lowest temperature"
        labels={chartData.monthly.labels}
        datasets = {[
          {
            label: `Highest Temperature (°C)`,
            data: chartData.monthly.highestTemps,
            backgroundColor: "rgba(255, 99, 132, 0.5)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
          },
          {
            label: `Lowest Temperature (°C)`,
            data: chartData.monthly.lowestTemps,
            backgroundColor: "rgba(54, 162, 235, 0.5)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          }
        ]}
      />
      <PieChartContainer
        title="Weather Distribution"
        labels={chartData.weatherDistribution.labels}
        data={chartData.weatherDistribution.data}
      />
    </Box>
  );
};

export default HistoryPage;