export class User {
    constructor(
        public id: string,
        private name: string,
        public contact: string,
        public city: string,
        public country: string,
        public description: string,
        public photoUrl?: string
    ) {}

    
    
}