export enum WmoCode {
  ClearSky = 0,

  MainlyClear = 1,
  PartlyCloudy = 2,
  Overcast = 3,

  Fog = 45,
  DepositingRimeFog = 48,

  DrizzleLight = 51,
  DrizzleModerate = 53,
  DrizzleDense = 55,

  FreezingDrizzleLight = 56,
  FreezingDrizzleDense = 57,

  RainSlight = 61,
  RainModerate = 63,
  RainHeavy = 65,

  FreezingRainLight = 66,
  FreezingRainHeavy = 67,

  SnowSlight = 71,
  SnowModerate = 73,
  SnowHeavy = 75,

  SnowGrains = 77,

  RainShowersSlight = 80,
  RainShowersModerate = 81,
  RainShowersViolent = 82,

  SnowShowersSlight = 85,
  SnowShowersHeavy = 86,

  Thunderstorm = 95,

  ThunderstormHailSlight = 96,
  ThunderstormHailHeavy = 99,
}

export function weatherIconClass(code: WmoCode): string {
  switch (code) {
    case WmoCode.ClearSky:
      return "wi-day-sunny";

    case WmoCode.MainlyClear:
    case WmoCode.PartlyCloudy:
      return "wi-day-cloudy";

    case WmoCode.Overcast:
      return "wi-day-sunny-overcast";

    case WmoCode.Fog:
    case WmoCode.DepositingRimeFog:
      return "wi-fog";

    case WmoCode.DrizzleLight:
    case WmoCode.DrizzleModerate:
    case WmoCode.DrizzleDense:
      return "wi-sprinkle";

    case WmoCode.FreezingDrizzleLight:
    case WmoCode.FreezingDrizzleDense:
      return "wi-rain-mix";

    case WmoCode.RainSlight:
    case WmoCode.RainModerate:
    case WmoCode.RainHeavy:
      return "wi-rain";

    case WmoCode.FreezingRainLight:
    case WmoCode.FreezingRainHeavy:
      return "wi-rain-mix";

    case WmoCode.SnowSlight:
    case WmoCode.SnowModerate:
    case WmoCode.SnowHeavy:
      return "wi-snow";

    case WmoCode.SnowGrains:
      return "wi-snow";

    case WmoCode.RainShowersSlight:
    case WmoCode.RainShowersModerate:
    case WmoCode.RainShowersViolent:
      return "wi-rain";

    case WmoCode.SnowShowersSlight:
    case WmoCode.SnowShowersHeavy:
      return "wi-snow-wind";

    case WmoCode.Thunderstorm:
    case WmoCode.ThunderstormHailSlight:
    case WmoCode.ThunderstormHailHeavy:
      return "wi-thunderstorm";
  }
}

export function weatherDescription(code: WmoCode): string {
  switch (code) {
    case WmoCode.ClearSky:
      return "Clear Sky";

    case WmoCode.MainlyClear:
      return "Mainly Clear";
    case WmoCode.PartlyCloudy:
      return "Partly Cloudy";

    case WmoCode.Overcast:
      return "Overcast";

    case WmoCode.Fog:
    case WmoCode.DepositingRimeFog:
      return "Fog";

    case WmoCode.DrizzleLight:
    case WmoCode.DrizzleModerate:
    case WmoCode.DrizzleDense:
      return "Drizzle";

    case WmoCode.FreezingDrizzleLight:
    case WmoCode.FreezingDrizzleDense:
      return "Freezing Drizzle";

    case WmoCode.RainSlight:
    case WmoCode.RainModerate:
    case WmoCode.RainHeavy:
      return "Rain";

    case WmoCode.FreezingRainLight:
    case WmoCode.FreezingRainHeavy:
      return "Freezing Rain";

    case WmoCode.SnowSlight:
    case WmoCode.SnowModerate:
    case WmoCode.SnowHeavy:
      return "Snow";

    case WmoCode.SnowGrains:
      return "Snow Grains";

    case WmoCode.RainShowersSlight:
    case WmoCode.RainShowersModerate:
    case WmoCode.RainShowersViolent:
      return "Rain Showers";

    case WmoCode.SnowShowersSlight:
    case WmoCode.SnowShowersHeavy:
      return "Snow Showers";

    case WmoCode.Thunderstorm:
    case WmoCode.ThunderstormHailSlight:
    case WmoCode.ThunderstormHailHeavy:
      return "Thunderstorm";
  }
}
