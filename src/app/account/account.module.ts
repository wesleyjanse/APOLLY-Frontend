import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account/account.component';
import { FormSharedModule } from '../core/form.module'
import { MaterialModule } from '../core/material.module';

@NgModule({
  declarations: [AccountComponent],
  imports: [
    CommonModule,
    FormSharedModule,
    MaterialModule
  ]
})
export class AccountModule { }
