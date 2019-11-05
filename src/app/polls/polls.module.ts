import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PollsComponent } from './polls/polls.component';
import { PollService } from './poll.service';
import { MaterialModule} from '../core/material.module'
import { FormSharedModule } from '../core/form.module'
import { ReactiveFormsModule } from '@angular/forms';
import { PollVoteComponent } from './poll-vote/poll-vote.component';
import { MyPollsComponent } from './my-polls/my-polls.component';
import { PollListComponent, DialogWarning } from './poll-list/poll-list.component';
import { PollCreateComponent, SnackBarComponent } from './poll-create/poll-create.component';

@NgModule({
  declarations: [PollsComponent, PollVoteComponent, MyPollsComponent, PollListComponent, PollCreateComponent, DialogWarning, SnackBarComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormSharedModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    DialogWarning,
    SnackBarComponent
  ],
  providers: [
    PollService
  ],
  exports: [
    PollVoteComponent,
    PollListComponent,
    PollCreateComponent,
    DialogWarning,
    SnackBarComponent
  ]
})
export class PollsModule { }
