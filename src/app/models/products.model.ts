export class Products {
    constructor(
        public nationalExpress: boolean, 
        public national: boolean, 
        public regionalExpress: boolean,
        public regional: boolean, 
        public suburban: boolean, 
        public bus: boolean, 
        public ferry: boolean, 
        public subway: boolean,
        public tram: boolean, 
        public taxi: boolean
    ) {}
}