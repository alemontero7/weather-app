import type { City } from "./Location";

export interface ILocationRepository {
    getLocationByName(
        name: string
    ): Promise<City[]>;
}
