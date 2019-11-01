import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FriendComponent } from './friend/friend.component';
import { MaterialModule} from '../core/material.module'
import { FormSharedModule } from '../core/form.module'


@NgModule({
  declarations: [FriendComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormSharedModule
  ]
})
export class FriendsModule { }
