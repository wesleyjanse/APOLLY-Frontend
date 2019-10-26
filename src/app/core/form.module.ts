import { NgModule } from '@angular/core';
import { MatFormFieldModule, MatInputModule, MatButtonModule } from '@angular/material';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';

@NgModule({
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  exports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class FormSharedModule { }
