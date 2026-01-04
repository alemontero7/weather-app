import type { IWeatherRepository } from "../domain/IWeatherRepository";
import type { WeatherForecast } from "../domain/Weather";

export class GetWeatherUsecase {
    private readonly weatherRepository: IWeatherRepository;

    constructor(weatherRepository: IWeatherRepository) {
        this.weatherRepository = weatherRepository;
    }

    async execute(
        latitude: number,
        longitude: number
    ): Promise<WeatherForecast> {
        return await
            this.weatherRepository.getWeatherByCoordinates(
                latitude,
                longitude
            );
    }
}