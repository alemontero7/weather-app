import type { CurrentWeather, DailyForecast, WeatherForecast } from "../domain/Weather";
import type { WeatherForecastDto } from "./weather.dto";

const weatherCodeMap: Record<number, string> = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Depositing rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    56: "Light freezing drizzle",
    57: "Dense freezing drizzle",
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",
    66: "Light freezing rain",
    67: "Heavy freezing rain",
    71: "Slight snow fall",
    73: "Moderate snow fall",
    75: "Heavy snow fall",
    77: "Snow grains",
    80: "Slight rain showers",
    81: "Moderate rain showers",
    82: "Violent rain showers",
    85: "Slight snow showers",
    86: "Heavy snow showers",
    95: "Thunderstorm",
    96: "Thunderstorm with slight hail",
    99: "Thunderstorm with heavy hail",
}

export function mapResponseToWeatherForecast(data: WeatherForecastDto): WeatherForecast {
    const currentWeather: CurrentWeather = {
        temperature: data.current.temperature_2m,
        windSpeed: data.current.wind_speed_10m,
        weatherDescription: weatherCodeMap[data.current.weather_code],
        weatherCode: data.current.weather_code,
        apparentTemperature: data.current.apparent_temperature,
        surfacePressure: data.current.surface_pressure,
        rain: data.current.rain,
        relativeHumidity: data.current.relative_humidity_2m,
        date: data.current.time,
    }

    const dailyForecasts: DailyForecast[] = data.daily.time.map((date, index) => ({
        date,
        maxTemperature: data.daily.temperature_2m_max[index],
        minTemperature: data.daily.temperature_2m_min[index],
        weatherDescription: weatherCodeMap[data.daily.weather_code[index]],
        weatherCode: data.daily.weather_code[index],
    }));

    return {
        currentWeather,
        dailyForecasts,
    }
}