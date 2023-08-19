export class FormSearch {
    constructor (
        public from: string,
        public to: string,
        public fromId: number,
        public toId: number,
        public depature: string,
        public arrival: string,
        public ice: boolean,
        public ic: boolean,
        public re: boolean,
        public rb: boolean,
        public sbahn: boolean,
        public bus: boolean
    ) {}
}