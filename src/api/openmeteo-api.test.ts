import { fetchHistoricalWeatherData } from "./OpenMeteo";

describe("fetchHistoricalWeatherData", () => {
  test("should fetch weather data successfully", async () => {
    // Define sample data for latitude, longitude, and year
    const latitude = 37.7749;
    const longitude = -122.4194;
    const year = 2022;

    // Mock the fetch function to return a resolved Promise with sample weather data
    // Mocking the global.fetch function allows us to simulate the behavior of making an HTTP request
    (global.fetch as jest.Mock) = jest.fn().mockResolvedValue({
      ok: true,
      // Simulate the response.json() method by returning a resolved Promise with sample weather data
      json: () =>
        Promise.resolve({
          latitude,
          longitude,
          generationtime_ms: 123456789,
          timezone: "UTC",
          daily_units: {
            time: "string",
            temperature_2m_max: "string",
            temperature_2m_min: "string",
          },
          daily: {
            time: ["2022-01-01"],
            temperature_2m_max: [25],
            temperature_2m_min: [15],
            weather_code: [800],
          },
        }),
    });

    // Call the fetchWeatherData function and await the result
    const result = await fetchHistoricalWeatherData(latitude, longitude, year);

    // Assertions to check if the returned data matches the expected values
    expect(result.latitude).toEqual(latitude);
    expect(result.longitude).toEqual(longitude);
    expect(result.daily.time.length).toBeGreaterThan(0);
    expect(result.daily.temperature_2m_max.length).toBeGreaterThan(0);
    expect(result.daily.temperature_2m_min.length).toBeGreaterThan(0);
    expect(result.daily.weather_code.length).toBeGreaterThan(0);
  });

  test("should handle failed data fetch", async () => {
    // Define sample data for latitude, longitude, and year
    const latitude = 37.7749;
    const longitude = -122.4194;
    const year = 2022;

    // Mock the fetch function to return a resolved Promise with 'ok' set to false
    (global.fetch as jest.Mock) = jest.fn().mockResolvedValue({ ok: false });

    // Use Jest's expect function to test if fetchWeatherData rejects with the expected error message
    await expect(fetchHistoricalWeatherData(latitude, longitude, year)).rejects.toThrow(
      "Failed to fetch data"
    );
  });
});