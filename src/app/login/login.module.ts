import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormSharedModule } from '../core/form.module'
import { MaterialModule } from '../core/material.module';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    FormSharedModule,
    MaterialModule
  ]
})
export class LoginModule { }
