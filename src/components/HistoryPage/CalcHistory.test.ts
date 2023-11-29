import {
  calculateMonthlyData,
} from "./CalcHistory";
import { HistoricalWeatherData } from "../../api/OpenMeteo";
import { WmoCode, weatherDescription, weatherIconClass } from "../WmoCode";

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
    temperature_2m_max: "number",
    temperature_2m_min: "number",
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
  test("should correctly calculate monthly temperature data", () => {
    const result = calculateMonthlyData(mockWeatherData.daily);

    expect(result.labels).toEqual(["2022-01", "2022-02", "2022-03"]);
    expect(result.highestTemps).toEqual([28, 32, 28]);
  });
});

describe("Weather Utility Functions", () => {
  describe("weatherIconClass", () => {
    it("should return the correct icon class for Clear Sky", () => {
      expect(weatherIconClass(WmoCode.ClearSky)).toEqual("wi-day-sunny");
    });

    it("should return the correct icon class for Partly Cloudy", () => {
      expect(weatherIconClass(WmoCode.PartlyCloudy)).toEqual("wi-day-cloudy");
    });

    it("should return the correct icon class for Overcast", () => {
      expect(weatherIconClass(WmoCode.Overcast)).toEqual(
        "wi-day-sunny-overcast"
      );
    });

    it("should return the correct icon class for Fog", () => {
      expect(weatherIconClass(WmoCode.Fog)).toEqual("wi-fog");
    });

    it("should return the correct icon class for Drizzle", () => {
      expect(weatherIconClass(WmoCode.DrizzleLight)).toEqual("wi-sprinkle");
      expect(weatherIconClass(WmoCode.DrizzleModerate)).toEqual("wi-sprinkle");
      expect(weatherIconClass(WmoCode.DrizzleDense)).toEqual("wi-sprinkle");
    });

    it("should return the correct icon class for Freezing Drizzle", () => {
      expect(weatherIconClass(WmoCode.FreezingDrizzleLight)).toEqual(
        "wi-rain-mix"
      );
      expect(weatherIconClass(WmoCode.FreezingDrizzleDense)).toEqual(
        "wi-rain-mix"
      );
    });
  });


  describe("weatherDescription", () => {
    it("should return the correct description for Clear Sky", () => {
      expect(weatherDescription(WmoCode.ClearSky)).toEqual("Clear Sky");
    });

    it("should return the correct description for Partly Cloudy", () => {
      expect(weatherDescription(WmoCode.PartlyCloudy)).toEqual("Partly Cloudy");
    });

    it("should return the correct description for Overcast", () => {
      expect(weatherDescription(WmoCode.Overcast)).toEqual("Overcast");
    });

    it("should return the correct description for Fog", () => {
      expect(weatherDescription(WmoCode.Fog)).toEqual("Fog");
    });

    it("should return the correct description for Drizzle", () => {
      expect(weatherDescription(WmoCode.DrizzleLight)).toEqual("Drizzle");
      expect(weatherDescription(WmoCode.DrizzleModerate)).toEqual("Drizzle");
      expect(weatherDescription(WmoCode.DrizzleDense)).toEqual("Drizzle");
    });

    it("should return the correct description for Freezing Drizzle", () => {
      expect(weatherDescription(WmoCode.FreezingDrizzleLight)).toEqual(
        "Freezing Drizzle"
      );
      expect(weatherDescription(WmoCode.FreezingDrizzleDense)).toEqual(
        "Freezing Drizzle"
      );
    });
  });
});