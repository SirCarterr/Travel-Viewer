import { LocationResult } from "./location-result.model";
import { Products } from "./products.model";

export class Location {
    constructor (
        public type: string,
        public id : string,
        public name : string,
        public location : LocationResult,
        public products: Products
    ) {}
}