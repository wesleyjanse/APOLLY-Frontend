export class Member {
    constructor(public memberID: number,
        public username: string,
        public password: string,
        public email: string,
        public token: string,
        public registered: boolean) { }
}