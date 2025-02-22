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

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'forget-pwd', component: ForgetPwdComponent },
  // { path: 'login',component: LoginComponent, children:
  //     [{path: 'forget-pwd',component: ForgetPwdComponent}]
  // },
  { path: 'signup', component: SignupComponent },
  {path: 'welcome', component: WelcomeComponent},
  { path: 'home-feed', component: HomeFeedComponent },
//   { path: 'home-feed', component: HomeFeedComponent ,
//     children:[
//         {path:'',component:RecipePostsComponent},
//         {path: '@userId/fullpostID', component: FullPostComponent}
//     ]
//   },

  { path: 'search', component: SearchComponent },

  { path: 'notifications', component: NotificationComponent },

  { path: 'account', component: AccountComponent },
  {path: 'account/edit-profile', component: EditComponent},
  { path: 'user/:user_tag', component: UserProfileComponent },

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
  { path: '@userId/fullpostID', loadComponent: () => import('../components/full-post/full-post.component').then(m => m.FullPostComponent) },





  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: '/not-found' },
];