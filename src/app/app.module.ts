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
import { MyPollsComponent } from './polls/my-polls/my-polls.component';
import { FriendComponent } from './friends/friend/friend.component';
import { FriendsModule} from './friends/friends.module';
import { NotificationsModule} from './notifications/notifications.module';
import { NotificationComponent } from './notifications/notification/notification.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Login', component: LoginComponent },
  { path: 'Register', component: RegisterComponent },
  { path: 'Polls', component: PollsComponent },
  { path: 'My-polls', component: MyPollsComponent },
  { path: 'Friends', component: FriendComponent },
  { path: 'Notifications', component: NotificationComponent },
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
    FriendsModule,
    NotificationsModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true })
  ],
  exports: [
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
