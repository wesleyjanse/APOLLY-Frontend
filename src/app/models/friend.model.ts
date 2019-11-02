import { Member } from './member.model';

export class Friend {
    constructor(public FriendsID: number,
        public MemberID: number,
        public FriendID: number,
        public Accepted: boolean,
        public member?: Member,
        public friend?: Member) { }
}