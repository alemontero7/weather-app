import { WeatherIcon } from "../atoms/WeatherIcon";

interface DailyForecastCardProps {
    date: string;
    maxTemperature: number;
    minTemperature: number;
    weatherCode: number;
}

export default function DailyForecastCard({
    date,
    maxTemperature,
    minTemperature,
    weatherCode
}: DailyForecastCardProps) {
    const dayName = new Date(date).toLocaleDateString("en-US", {
        weekday: "short"
    });

    return (
        <div className="flex flex-col 
                        items-center justify-center p-4 
                        bg-white rounded-2xl shadow-sm border 
                        border-gray-100 min-w-[100px] hover:shadow-md transition-shadow">
            <span className="text-gray-500 font-medium mb-3">
                {dayName} - {date.split("-")[2]}
            </span>

            <div className="mb-3">
                <WeatherIcon code={weatherCode} className="w-12 h-12" />
            </div>

            <div className="text-center">
                <span className="block text-xl font-bold text-gray-800">
                    {maxTemperature}°C
                </span>
                <span className="block text-sm text-gray-400 font-medium mt-1">
                    {minTemperature}°C
                </span>
            </div>
        </div>
    )
}
