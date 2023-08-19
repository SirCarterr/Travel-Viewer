import { Journey } from "./journey.model";

export class JourneysResponse {
    public earlierRef: string = '';
    public laterRef: string = '';
    public realtimeDataUpdatedAt: number = -1;
    public journeys: Journey[] = [];

    constructor() {}
}