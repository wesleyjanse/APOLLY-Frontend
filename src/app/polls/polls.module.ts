import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PollsComponent } from './polls/polls.component';
import { PollService } from './poll.service';
import { MaterialModule} from '../core/material.module'


@NgModule({
  declarations: [PollsComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  providers: [
    PollService
  ]
})
export class PollsModule { }
