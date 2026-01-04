import type { ILocationRepository } from "../domain/ILocationRepository";
import type { City } from "../domain/Location";
import { mapResponseToLocation } from "./location.mapper";

export class LocationRepository implements ILocationRepository {

    private readonly baseUrl: string;

    constructor() {
        const url = import.meta.env.VITE_GEOCODING_API_URL;
        if (!url) {
            throw new Error("GEOCODING_API_URL is not defined");
        }
        this.baseUrl = url;
    }
    
    async getLocationByName(
        name: string
    ): Promise<City[]> {

        const url = new URL(this.baseUrl);
        url.searchParams.append("name", name);
        url.searchParams.append("count", "10");
        url.searchParams.append("language", "en");
        url.searchParams.append("format", "json");

        try {
            const response = await fetch(url.toString());

            if (!response.ok) {
                throw new Error(`Error fetching location data: ${response.statusText}`);
            }

            const data = await response.json();

            if(!data.results) {
                return [];
            }

            return data.results.map(mapResponseToLocation);

        }

        catch (error) {
            throw new Error(`An error happened: ${(error as Error).message}`);
        }
    }
}
