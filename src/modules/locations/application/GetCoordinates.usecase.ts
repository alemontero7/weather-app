import type { ILocationRepository } from "../domain/ILocationRepository";
import type { City } from "../domain/Location";

export class GetCoordinatesUsecase {
    private readonly locationRepository: ILocationRepository;

    constructor(locationRepository: ILocationRepository) {
        this.locationRepository = locationRepository;
    }

    async execute(name: string): Promise<City[]> {
        if(!name || name.trim().length === 0) {
            return [];
        }
        const locations = await this.locationRepository.getLocationByName(name);
        return locations;
    }
}