import type { IWeatherRepository } from "../domain/IWeatherRepository";
import type { WeatherForecast } from "../domain/Weather";
import { mapResponseToWeatherForecast } from "./weather.mapper";

export class WeatherRepository implements IWeatherRepository {

    private readonly baseUrl: string;

    constructor() {
        const url = import.meta.env.VITE_WEATHER_API_URL;
        if (!url) {
            throw new Error("WEATHER_API_URL is not defined");
        }
        this.baseUrl = url;
    }

    async getWeatherByCoordinates(
        latitude: number,
        longitude: number
    ): Promise<WeatherForecast> {

        const url = new URL(this.baseUrl);
        url.searchParams.append("latitude", latitude.toString());
        url.searchParams.append("longitude", longitude.toString());
        url.searchParams.append("daily", "weather_code,temperature_2m_max,temperature_2m_min");
        url.searchParams.append("current", "temperature_2m,weather_code,wind_speed_10m,apparent_temperature,surface_pressure,rain,precipitation,relative_humidity_2m");

        try {
            const response = await fetch(url.toString());

            if (!response.ok) {
                throw new Error(`Failed to fetch weather data: ${response.statusText}`);
            }

            const data = await response.json();

            if (!data) {
                throw new Error("No weather data found");
            }

            return mapResponseToWeatherForecast(data);
        }

        catch (error) {
            throw new Error(`An error happened: ${(error as Error).message}`);
        }
    }
}
