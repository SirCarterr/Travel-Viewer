import { Location } from "./location.model"

export class Stop {
    constructor(
        public tripId: string,
        public stop: Location,
        public when: string,
        public plannedWhen: string,
        public delay: number,
        public platform: string,
        public plannedPlatform: string,
        public prognosisType: string,
        public direction: string,
        public provenance: string,
        public line: {
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
        public remarks: {
            text: string,
            type: string,
            code: string,
            summary: string
        }[],
        public origin: Location,
        public destination: Location,
        public currentTripPosition: {
            type: string,
            latitude: number,
            longitude: number
        }
    ){}
}