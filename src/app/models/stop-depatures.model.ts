import { Stop } from "./stop.model";

export class StopDepatures {
    realtimeDataUpdateAt: number = -1;
    departures: Stop[] = [];

    constructor() {}
}