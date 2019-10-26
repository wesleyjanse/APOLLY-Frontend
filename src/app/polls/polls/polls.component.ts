import { Component, OnInit } from '@angular/core';
import { PollService } from '../poll.service';
import { Observable } from 'rxjs';
import { PollMember } from '../../models/pollmember.model';

@Component({
  selector: 'app-polls',
  templateUrl: './polls.component.html',
  styleUrls: ['./polls.component.scss']
})
export class PollsComponent implements OnInit {

  polls: Observable<PollMember[]>;
  breakpoint: number;

  constructor(private _pollService: PollService) {
    this.polls = this._pollService.getPolls();
  }

  onClick(){
    console.log(this.polls)
  }

  ngOnInit() { 
    this.breakpoint = (window.innerWidth <= 990) ? 1 : 2;
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 990) ? 1 : 2;
  }

}
