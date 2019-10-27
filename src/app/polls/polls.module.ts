import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PollsComponent } from './polls/polls.component';
import { PollService } from './poll.service';
import { MaterialModule} from '../core/material.module'
import { FormSharedModule } from '../core/form.module'
import { ReactiveFormsModule } from '@angular/forms';
import { PollVoteComponent } from './poll-vote/poll-vote.component';

@NgModule({
  declarations: [PollsComponent, PollVoteComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormSharedModule,
    ReactiveFormsModule
  ],
  providers: [
    PollService
  ],
  exports: [
    PollVoteComponent
  ]
})
export class PollsModule { }
