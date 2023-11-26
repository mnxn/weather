import {
  calculateMonthlyData,
  calculateWeatherDistributionData,
  formatChartData,
} from "./CalcHistory";
import { HistoricalWeatherData } from "../../api/OpenMeteo";

// Mock WeatherData for testing
const mockWeatherData: HistoricalWeatherData = {
  latitude: 37.7749,
  longitude: -122.4194,
  generationtime_ms: 123456789,
  utc_offset_seconds: 0,
  timezone: "UTC",
  timezone_abbreviation: "UTC",
  elevation: 0,
  daily_units: {
    time: "string",
    temperature_2m_max: "string",
    temperature_2m_min: "string",
  },
  daily: {
    time: [
      "2022-01-01",
      "2022-01-02",
      "2022-02-01",
      "2022-02-02",
      "2022-03-01",
      "2022-03-02",
    ],
    temperature_2m_max: [25, 28, 30, 32, 28, 26],
    temperature_2m_min: [15, 18, 20, 22, 18, 16],
    weather_code: [0, 1, 3, 55, 73, 51],
  },
};

describe("calculateMonthlyData", () => {
  // Test for calculateMonthlyData function
  test("should calculate monthly temperature data correctly", () => {
    // Call calculateMonthlyData with mock weather data
    const result = calculateMonthlyData(mockWeatherData.daily);

    // Assert that the resulting labels match the expected monthly labels
    expect(result.labels).toEqual(["2022-01", "2022-02", "2022-03"]);
    // Assert that the resulting highest temperatures array is calculated accurately
    expect(result.highestTemps).toEqual([25, 28, 30, 32, 28, 26]);
  });
});

describe("calculateWeatherDistributionData", () => {
  // Test for calculateWeatherDistributionData function
  test("should calculate weather distribution data correctly", () => {
    const result = calculateWeatherDistributionData(mockWeatherData.daily);

    expect(result.labels).toEqual(["sunny", "rainy", "cloudy"]);
    // Assert that the resulting data array is calculated accurately
    expect(result.data).toEqual([2, 3, 1]);
  });
});

describe("formatChartData", () => {
  test("should format chart data correctly", () => {
    const result = formatChartData(mockWeatherData);

    expect(result.monthly.labels).toEqual(["2022-01", "2022-02", "2022-03"]);
    expect(result.weatherDistribution.labels).toEqual([
      "sunny",
      "rainy",
      "cloudy",
    ]);
    expect(result.weatherDistribution.data).toEqual([2, 3, 1]);
  });
});