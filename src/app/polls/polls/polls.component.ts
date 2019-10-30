import { Component, OnInit } from '@angular/core';
import { PollService } from '../poll.service';
import { Observable } from 'rxjs';
import { PollMember } from '../../models/pollmember.model';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-polls',
  templateUrl: './polls.component.html',
  styleUrls: ['./polls.component.scss']
})
export class PollsComponent implements OnInit {

  polls: Observable<PollMember[]>;

  constructor(private _pollService: PollService, private fb: FormBuilder) {
    this.polls = this._pollService.getPolls();
  }

  ngOnInit() {

  }
}
