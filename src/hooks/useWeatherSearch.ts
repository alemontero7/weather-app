import { useState } from "react";
import type { City } from "../modules/locations/domain/Location";
import type { WeatherForecast } from "../modules/weather/domain/Weather";
import { GetCoordinatesUsecase } from "../modules/locations/application/GetCoordinates.usecase";
import type { ILocationRepository } from "../modules/locations/domain/ILocationRepository";
import { LocationRepository } from "../modules/locations/infrastructure/location.repository";
import { GetWeatherUsecase } from "../modules/weather/application/get-weather.usecase";
import type { IWeatherRepository } from "../modules/weather/domain/IWeatherRepository";
import { WeatherRepository } from "../modules/weather/infrastructure/weather.repository";

export function useWeatherSearch() {
    const [query, setQuery] = useState('');
    const [city, setCity] = useState<City>();
    const [weather, setWeather] = useState<WeatherForecast>();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const coordinatesRepository: ILocationRepository = new LocationRepository();
    const weatherRepository: IWeatherRepository = new WeatherRepository();
    const getCoordinatesUsecase = new GetCoordinatesUsecase(coordinatesRepository);
    const getWeatherUseCase = new GetWeatherUsecase(weatherRepository);

    const getWeatherForCity = async (city: City) => {
        try {
            const weatherResponse = await getWeatherUseCase.execute(city.latitude, city.longitude);
            setWeather(weatherResponse);
        } catch (error) {
            setError((error as Error).message);
        }
    };

    const handleSearch = async () => {
        if (!query || query.trim().length === 0) {
            setCity(undefined);
            return;
        }
        setIsLoading(true);
        setError(null);
        try {
            const results = await getCoordinatesUsecase.execute(query);
            if (results.length > 0) {
                await getWeatherForCity(results[0]);
                setCity(results[0]);
            } else {
                setCity(undefined);
                setWeather(undefined);
                setError("City not found, please enter another city");
            }
        } catch (error) {
            setError((error as Error).message);
        } finally {
            setIsLoading(false);
        }
    }

    return {
        query,
        setQuery,
        city,
        weather,
        isLoading,
        error,
        handleSearch
    };
}