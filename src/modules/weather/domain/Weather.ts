export interface DailyForecast {
    date: string;
    maxTemperature: number;
    minTemperature: number;
    weatherDescription: string;
    weatherCode: number;
}

export interface CurrentWeather {
    temperature: number;
    windSpeed: number;
    weatherDescription: string;
    weatherCode: number;
    apparentTemperature: number;
    surfacePressure: number;
    rain: number;
    relativeHumidity: number;
    date: string;
}

export interface WeatherForecast {
    currentWeather: CurrentWeather;
    dailyForecasts: DailyForecast[];
}