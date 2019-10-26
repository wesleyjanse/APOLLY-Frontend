import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login/login.component';
import { LoginModule } from './login/login.module';
import { MaterialModule } from './core/material.module';
import { HomeComponent } from './home/home.component';
import { PollsComponent } from './polls/polls/polls.component';
import { PollsModule } from './polls/polls.module';
import { RegisterComponent } from './login/register/register.component';
 
const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'polls', component: PollsComponent },
  ];
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MaterialModule,
    LoginModule,
    PollsModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true })
  ],
  exports: [
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
