import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './notification/notification.component';
import { MaterialModule } from '../core/material.module'
import { FormSharedModule } from '../core/form.module'

@NgModule({
  declarations: [NotificationComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormSharedModule
  ]
})
export class NotificationsModule { }
