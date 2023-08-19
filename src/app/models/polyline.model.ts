import { Location } from "./location.model";

export class Polyline {
    constructor (
        public type: string,
        public features: {
            type: string,
            properties: Location,
            geometry: {
                type: string,
                coordinates: number[]
            }
        }[]
    ) {}
}