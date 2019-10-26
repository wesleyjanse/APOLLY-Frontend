import { Poll } from './poll.model';
import { Member } from './member.model';

export class PollMember {
    constructor(public pollMemberID: number,
        public pollID: number,
        public memberID: number,
        public poll: Poll,
        public member: Member
        ) { }
}