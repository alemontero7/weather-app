import { CloudRain, Droplets, Gauge, Thermometer } from "lucide-react";
import DetailElement from "../atoms/DetailElement";
import { WeatherIcon } from "../atoms/WeatherIcon";
import type { City } from "../../modules/locations/domain/Location";
import type { WeatherForecast } from "../../modules/weather/domain/Weather";

interface CurrentWeatherCardProps {
    city: City;
    weather: WeatherForecast;
}

const extractTime = (dateString: string): string => {
    return dateString.split("T")[1];
};

export default function CurrentWeatherCard({
    city,
    weather
}: CurrentWeatherCardProps
) {
    return (
        <div className='w-full bg-[#1277DE] rounded-xl shadow-lg p-6 flex flex-row'>
            <div className="p-6 w-1/2">
                <h2 className="text-5xl font-semibold text-white">{city.name}</h2>
                <h3 className="text-gray-200 pt-2">{city.jurisdiction}</h3>
                <div className='flex flex-row gap-6 pt-8'>
                    <p className="text-white text-8xl font-bold">{weather.currentWeather.temperature}°C</p>
                    <div className='flex flex-col gap-2'>
                        <WeatherIcon code={weather.currentWeather.weatherCode} className="w-14 h-14" />
                        <p className="text-white text-xl">{weather.currentWeather.weatherDescription}</p>
                    </div>
                </div>
            </div>
            <div className="w-1/2 flex flex-col justify-around items-end px-6">

                <div>
                    <h3 className="text-white text-2xl font-bold mb-4">{extractTime(weather.currentWeather.date)}</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
                    <DetailElement
                        label="Feels like"
                        value={weather.currentWeather.apparentTemperature}
                        unit="°C"
                        icon={<Thermometer />}
                    />

                    <DetailElement
                        label="Pressure"
                        value={Math.round(weather.currentWeather.surfacePressure)}
                        unit="hPa"
                        icon={<Gauge />}
                    />

                    <DetailElement
                        label="Rain"
                        value={weather.currentWeather.rain || 0}
                        unit="mm"
                        icon={<CloudRain />}
                    />

                    <DetailElement
                        label="Humidity"
                        value={weather.currentWeather.relativeHumidity}
                        unit="%"
                        icon={<Droplets />}
                    />
                </div>
            </div>
        </div>
    )
}
