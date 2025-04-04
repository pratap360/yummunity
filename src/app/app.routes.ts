import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SignupComponent } from './signup/signup.component';
import { HomeFeedComponent } from './home-feed/home-feed.component';
import { SearchComponent } from './search/search.component';
import { NotificationComponent } from './notification/notification.component';
import { AccountComponent } from './account/account.component';
import { ForgetPwdComponent } from './login/forget-pwd/forget-pwd.component';
import { FullPostComponent } from '../components/full-post/full-post.component';
import { RecipePostsComponent } from '../components/recipe-posts/recipe-posts.component';
import { EditComponent } from './account/edit/edit.component';
import { WelcomeComponent } from './signup/welcome/welcome.component';
import { UserProfileComponent } from './account/user-profile/user-profile.component';
import { authGuard } from './services/Auth/auth.guard';
import { publicGuardGuard } from './services/public-guard.guard';
import { sign } from 'crypto';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent,canActivate: [publicGuardGuard]},
  { path: 'forget-pwd', component: ForgetPwdComponent ,canActivate: [publicGuardGuard]},
  { path: 'signup', component: SignupComponent, canActivate: [publicGuardGuard]},  

  // !! both guard implemented but getting error while going form signup to welcome for the below line 👇
  // { path: 'welcome', component: WelcomeComponent, canActivate: [authGuard,publicGuardGuard]},
  { path: 'welcome', component: WelcomeComponent,},

  { path: 'home-feed', component: HomeFeedComponent, canActivate: [authGuard]},
  { path: 'search', component: SearchComponent, canActivate: [authGuard] },
  { path: 'notifications', component: NotificationComponent, canActivate: [authGuard] },
  { path: 'account', component: AccountComponent , canActivate: [authGuard]  },
  { path: 'account/edit-profile', component: EditComponent, canActivate: [authGuard] },
  { path: 'user/:user_tag', component: UserProfileComponent, canActivate: [authGuard] },

  {
    // path: 'user/:user_tag/fullpostID',
    path: 'user/:user_tag/post/:post_id', component: FullPostComponent,
    // loadComponent: () =>
    //   import('../components/full-post/full-post.component').then(
    //     (m) => m.FullPostComponent
    //   ),
  },

  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: '/not-found' },
];


  // { path:'post/:documentId', component: FullPostComponent },
  // { path:'fullpost/:documentId', component: FullPostComponent },
  // { path:'fullpost', component: FullPostComponent },
  //   {
  //     path: 'fullpost',
  //     loadComponent: () =>
  //       import('../components/full-post/full-post.component').then(
  //         (m) => m.FullPostComponent
  //       ),
  //   },