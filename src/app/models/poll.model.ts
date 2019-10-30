import { Observable } from 'rxjs';
import { Answer } from './answer.model';
import { Vote } from './vote.model';

export class Poll {
    constructor(public pollID: number,
        public Name: string,
        public Private: boolean,
        public CreatedOn: Date,
        public answers?: Observable<Answer>,
        public votes?: Observable<Vote>) { }
}
