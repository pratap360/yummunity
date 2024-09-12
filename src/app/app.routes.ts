import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SignupComponent } from './signup/signup.component';
import { HomeFeedComponent } from './home-feed/home-feed.component';
import { SearchComponent } from './search/search.component';
import { NotificationComponent } from './notification/notification.component';
import { AccountComponent } from './account/account.component';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'signup', component: SignupComponent},
    {path: 'home-feed', component: HomeFeedComponent},
    {path: 'search', component: SearchComponent},
    {path: 'notfication', component: NotificationComponent},
    {path: 'account', component: AccountComponent},
    
    
    {path: '**', component: NotFoundComponent},
];
