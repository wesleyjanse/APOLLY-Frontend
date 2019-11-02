import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FriendComponent, SnackBarComponent } from './friend/friend.component';
import { MaterialModule} from '../core/material.module'
import { FormSharedModule } from '../core/form.module'


@NgModule({
  declarations: [FriendComponent,SnackBarComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormSharedModule
  ],
  entryComponents: [
    SnackBarComponent
  ],
  exports: [
    SnackBarComponent
  ]
})
export class FriendsModule { }
