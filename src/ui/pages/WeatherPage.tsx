import { useState } from "react";
import { GetCoordinatesUsecase } from "../../modules/locations/application/GetCoordinates.usecase";
import type { ILocationRepository } from "../../modules/locations/domain/ILocationRepository";
import type { City } from "../../modules/locations/domain/Location";
import { LocationRepository } from "../../modules/locations/infrastructure/location.repository";
import { GetWeatherUsecase } from "../../modules/weather/application/get-weather.usecase";
import type { IWeatherRepository } from "../../modules/weather/domain/IWeatherRepository";
import type { WeatherForecast } from "../../modules/weather/domain/Weather";
import { WeatherRepository } from "../../modules/weather/infrastructure/weather.repository";
import CustomButton from "../atoms/Button";
import CurrentWeatherCard from "../molecules/CurrentWeatherCard";
import DailyForecastCard from "../molecules/DailyForecastCard";
import { SearchBar } from "../molecules/Searchbar";

const coordinatesRepository: ILocationRepository = new LocationRepository();
const weatherRepository: IWeatherRepository = new WeatherRepository();
const getCoordinatesUsecase = new GetCoordinatesUsecase(coordinatesRepository);
const getWeatherUseCase = new GetWeatherUsecase(weatherRepository);

export default function WeatherPage() {
    const [query, setQuery] = useState('');
    const [city, setCity] = useState<City>();
    const [weather, setWeather] = useState<WeatherForecast>();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getWeatherForCity = async (city: City) => {
        try {
            const weatherResponse = await getWeatherUseCase.execute(city.latitude, city.longitude);
            setWeather(weatherResponse);
            console.log(weatherResponse);
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
    return (
        <>
            <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-20 px-4">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">The forecast web</h1>
                <div className="w-full max-w-5xl flex flex-col gap-6">
                    <div className='w-full flex gap-4 items-center justify-around'>
                        <SearchBar
                            value={query}
                            onChange={setQuery}
                            onSearch={handleSearch}
                            isLoading={isLoading}
                            placeholder="Enter the name of a city..."
                        />
                        <CustomButton
                            handleSearch={handleSearch}
                            isLoading={isLoading}
                            isDisabled={isLoading || !query.trim()}
                            labelLoading="Searching..."
                            labelDefault="Search"
                        />
                    </div>

                    {error && (
                        <div className="w-full p-4 bg-red-100 border border-red-200 text-red-700 rounded-lg text-center">
                            {error}
                        </div>
                    )}

                    {city && weather && (
                        <>
                            <CurrentWeatherCard city={city} weather={weather} />
                            <h3 className="text-xl font-bold text-gray-500 mb-4 mt-8">7-Day Forecast</h3>
                            <div className='w-full grid grid-cols-2 md:grid-cols-7 sm:grid-cols-4 gap-4 pb-6'>
                                {weather.dailyForecasts.map((day) => (
                                    <DailyForecastCard
                                        key={day.date}
                                        date={day.date}
                                        maxTemperature={day.maxTemperature}
                                        minTemperature={day.minTemperature}
                                        weatherCode={day.weatherCode}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
