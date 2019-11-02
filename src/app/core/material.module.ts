import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatIconModule, MatSidenavModule, 
         MatListModule, MatButtonModule, MatCardModule, MatGridListModule, 
         MatBadgeModule, MatProgressSpinnerModule, MatExpansionModule,
         MatSlideToggleModule, MatTooltipModule, MatStepperModule, MatDialogModule,
         MatAutocompleteModule, MatChipsModule, MatSnackBarModule } from  '@angular/material';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatGridListModule,
    MatBadgeModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatStepperModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatSnackBarModule
  ],
  exports: [
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule, 
    MatCardModule,
    MatGridListModule,
    MatBadgeModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatStepperModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatSnackBarModule
  ]
})
export class MaterialModule { }
