import { Member } from './member.model';

export class Friend {
    constructor(public FreindsID: number,
        public MemberID: number,
        public FreindID: number,
        public Accepted: boolean,
        public member: Member,
        public friend: Member) { }
}