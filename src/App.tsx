import { useState } from 'react'
import './App.css'
import type { City } from './modules/locations/domain/Location';
import type { ILocationRepository } from './modules/locations/domain/ILocationRepository';
import { GetCoordinatesUsecase } from './modules/locations/application/GetCoordinates.usecase';
import { LocationRepository } from './modules/locations/infrastructure/location.repository';
import { SearchBar } from './ui/molecules/Searchbar';
import CustomButton from './ui/atoms/Button';

const repository: ILocationRepository = new LocationRepository();
const getCoordinatesUsecase = new GetCoordinatesUsecase(repository);

function App() {

  const [query, setQuery] = useState('');
  const [city, setCity] = useState<City>()
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!query || query.trim().length === 0) {
      setCity(undefined);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const results = await getCoordinatesUsecase.execute(query);
      setCity(results[0]);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-20 px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Search city</h1>

        <div className='w-full flex gap-4 justify-center items-center'>
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
          />
        </div>


        <div className="mt-10 w-full max-w-md">
          {error && (
            <div className="p-4 mb-4 text-red-700 bg-red-100 rounded-lg text-center">
              {error}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default App
