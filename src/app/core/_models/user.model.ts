export class User {
    constructor(
        public email: string,
        public id: string,
        private _token: string,
        public tokenExpirationDate: Date,
        public username: string,
        public photoUrl?: string
    ) {}

    get token() {
        if (!this.tokenExpirationDate || new Date() > this.tokenExpirationDate) {
            return null;
        }
        return this._token;
    }
}