import { Cloud, CloudDrizzle, CloudFog, CloudLightning, CloudRain, CloudSnow, CloudSun, Sun } from "lucide-react";

interface WeatherIconProps {
    code: number;
    className?: string;
}

export const WeatherIcon = ({ code, className = "w-10 h-10" }: WeatherIconProps) => {
    switch (code) {
        case 0:
            return <Sun className={`text-yellow-400 ${className}`} fill="currentColor" />;
        case 1:
        case 2:
        case 3:
            return <CloudSun className={`text-gray-100 ${className}`} fill="gray" />;
        case 45:
        case 48:
            return <CloudFog className={`text-gray-300 ${className}`} />;
        case 51: case 53: case 55:
        case 61: case 63: case 65:
            return <CloudRain className={`text-blue-400 ${className}`} fill="currentColor" />;
        case 71: case 73: case 75: case 77:
            return <CloudSnow className={`text-white ${className}`} fill="white" />;
        case 80: case 81: case 82:
            return <CloudDrizzle className={`text-blue-300 ${className}`} />;
        case 95: case 96: case 99:
            return <CloudLightning className={`text-purple-400 ${className}`} fill="currentColor" />;
        default:
            return <Cloud className={`text-gray-400 ${className}`} />;
    }
}
