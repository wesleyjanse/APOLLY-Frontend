import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { AccountModule } from './account/account.module';
import { AuthGuard } from './login/guards/auth.guard';
import { AccountComponent } from './account/account/account.component';
import { AuthenticateService } from './login/services/authenticate.service';
import { SecurityInterceptor } from './login/security.interceptor';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Login', component: LoginComponent },
  { path: 'Register', component: RegisterComponent },
  { path: 'Register/:email', component: RegisterComponent },
  { path: 'Polls', component: PollsComponent, canActivate: [AuthGuard] },
  { path: 'My-polls', component: MyPollsComponent, canActivate: [AuthGuard] },
  { path: 'Friends', component: FriendComponent, canActivate: [AuthGuard] },
  { path: 'Notifications', component: NotificationComponent, canActivate: [AuthGuard] },
  { path: 'Account', component: AccountComponent, canActivate: [AuthGuard] },
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
    AccountModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true })
  ],
  exports: [
    MaterialModule
  ],
  providers: [
    AuthenticateService,
    {
    provide: HTTP_INTERCEPTORS,
    useClass: SecurityInterceptor,
    multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
