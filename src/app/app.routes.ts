import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SignupComponent } from './signup/signup.component';
import { HomeFeedComponent } from './home-feed/home-feed.component';
import { SearchComponent } from './search/search.component';
import { NotificationComponent } from './notification/notification.component';
import { AccountComponent } from './account/account.component';
import { ForgetPwdComponent } from './login/forget-pwd/forget-pwd.component';

export const routes: Routes = [
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path:'forget-pwd', component: ForgetPwdComponent},
    // { path: 'login',component: LoginComponent, children: 
    //     [{path: 'forget-pwd',component: ForgetPwdComponent}]
    // },
    {path: 'signup', component: SignupComponent},

    {path: 'home-feed', component: HomeFeedComponent},

    {path: 'search', component: SearchComponent},

    {path: 'notifications', component: NotificationComponent},
    
    {path: 'account', component: AccountComponent},
    
    
    {path: '**', component: NotFoundComponent},
];



