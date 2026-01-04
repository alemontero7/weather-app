import type { WeatherForecast } from "./Weather";

export interface IWeatherRepository {
    getWeatherByCoordinates(
        latitude: number,
        longitude: number
    ): Promise<WeatherForecast>;
}