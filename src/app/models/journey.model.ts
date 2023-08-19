import { Location } from "./location.model"
import { Polyline } from "./polyline.model"

export class Journey {
    constructor(
        public type: string,
        public legs: {
            origin: Location,
            destination: Location,
            depature: string,
            plannedDepature: string,
            depatureDelay: number,
            arrival: string,
            plannedArrival: string,
            arrivalDelay: number,
            reachable: boolean,
            tripId: string
            line: {
                type: string,
                id: string,
                fahrtNr: string,
                name: string,
                public: boolean,
                adminCode: string,
                productName: string,
                mode: string,
                product: string
                operator: {
                    type: string,
                    id: string,
                    name: string
                }
            },
            direction: string,
            arrivalPlatform: string,
            plannedArrivalPlatform: string,
            arrivalPrognosisType: string,
            depaturePlatform: string,
            plannedDeparturePlatform: string,
            departurePrognosisType: string,
            polyline: Polyline
            remarks: {
                text: string,
                type: string,
                code: string,
                summary: string
            }[],
            loadFactor: string
        }[],
        public refreshToken: string,
        public price: {
            amount: number,
            currency: string,
            hint: string
        }
    ){}
}