import { type ChangeEvent, type FormEvent } from "react";

interface SearchBarProps {
    value: string;
    onSearch: () => void;
    onChange: (value: string) => void;
    isLoading?: boolean;
    placeholder?: string;
    className?: string;
}

export const SearchBar = ({
    value,
    onSearch,
    onChange,
    isLoading = false,
    placeholder = "Search...",
}: SearchBarProps) => {

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        if (value.trim().length === 0) return;
        onSearch();
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="relative w-full max-w-md"
        >
            <div className="relative group">
                <input
                    type="text"
                    value={value}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
                    placeholder={placeholder}
                    disabled={isLoading}
                    className="
                    w-full pl-4 pr-12 py-3 bg-white border-2 
                    border-gray-200 rounded-full 
                    text-gray-700 placeholder-gray-400 
                    outline-none transition-all duration-300 
                    focus:border-blue-500 focus:shadow-lg 
                    disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
            </div>
        </form>
    );
}