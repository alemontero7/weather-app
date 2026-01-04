import type { LocationDto } from "./location.dto";
import type { City } from "../domain/Location";

export function mapResponseToLocation(data: LocationDto): City {
    return {
        name: data.name + (data.admin1 ? `, ${data.admin1}` : ''),
        latitude: data.latitude,
        longitude: data.longitude,
    };
}