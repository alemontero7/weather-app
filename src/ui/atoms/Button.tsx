interface ButtonProps {
    handleSearch: () => void;
    isLoading: boolean;
    isDisabled: boolean;
    labelLoading?: string;
    labelDefault?: string;
}

export default function CustomButton({
    handleSearch,
    isLoading,
    isDisabled,
    labelLoading,
    labelDefault
}: ButtonProps) {
    return (
        <button
            onClick={handleSearch}
            disabled={isDisabled}
            className="px-6 py-3 bg-blue-600 text-white font-semibold 
            rounded-lg shadow-md hover:bg-blue-700 
            disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
            {isLoading ? labelLoading : labelDefault}
        </button>
    )
}
