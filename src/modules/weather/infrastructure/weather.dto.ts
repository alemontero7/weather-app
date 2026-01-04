export interface DailyForecastDto {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
}

export interface CurrentWeatherDto {
    time: string;
    interval: number;
    temperature_2m: number;
    weather_code: number;
    wind_speed_10m: number;
    apparent_temperature: number;
    surface_pressure: number;
    rain: number;
    relative_humidity_2m: number;    
}

export interface WeatherForecastDto {
    latitude: number;
    longitude: number;
    timezone: string;
    current: CurrentWeatherDto;
    daily: DailyForecastDto;
}
