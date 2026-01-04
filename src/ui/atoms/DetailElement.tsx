interface DetailElementProps {
    label: string;
    value: string | number;
    unit?: string;
    icon: React.ReactNode;
}

export default function DetailElement({
    label,
    value,
    unit = "",
    icon
}: DetailElementProps) {
    return (
        <div className="flex flex-col items-start justify-center">
            <span className="text-sm font-bold text-blue-200 uppercase mb-1 tracking-wider">
                {label}
            </span>
            <div className="flex items-center gap-2 text-white">
                <div className="opacity-80 [&>svg]:w-5 [&>svg]:h-5">
                    {icon}
                </div>
                <span className="text-sm font-bold tracking-wide">
                    {value} {unit}
                </span>
            </div>
        </div>
    );
}
