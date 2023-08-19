import { Stop } from "./stop.model";

export class StopArrivals {
    realtimeDataUpdateAt: number = -1;
    arrivals: Stop[] = [];

    constructor() {}
}