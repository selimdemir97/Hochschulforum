import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { AnotherProfileComponent } from './another-profile/another-profile.component';
import { BeforeLoginService } from './services/before-login.service';
import { AfterLoginService } from './services/after-login.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CommentComponent } from './comment/comment.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { UpdatePostComponent } from './update-post/update-post.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { AddCommentComponent } from './add-comment/add-comment.component';
import { UpdateCommentComponent } from './update-comment/update-comment.component';

const routes: Routes = [
  //Hier wird die canActivate Methode aus dem before bzw after-login.service benutzt, damit der User nicht auf einige Komponenten zugreift
  //ohne eingeloggt oder registriert zu sein
  {path: 'login', component: LoginComponent, canActivate: [BeforeLoginService]},
  {path: 'register', component: RegisterComponent, canActivate: [BeforeLoginService]},
  {path: 'profile', component: ProfileComponent, canActivate: [AfterLoginService]},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AfterLoginService]},
  {path: ':id/profile', component: AnotherProfileComponent, canActivate: [AfterLoginService]},
  {path: ':id/comments', component: CommentComponent, canActivate: [AfterLoginService]},
  {path: 'newpost', component: CreatePostComponent, canActivate: [AfterLoginService]},
  {path: ':id/edit', component: UpdatePostComponent, canActivate: [AfterLoginService]},
  {path: ':id/editProfile', component: UpdateUserComponent, canActivate: [AfterLoginService]},
  {path: ':id/addcomment', component: AddCommentComponent, canActivate: [AfterLoginService]},
  {path: ':id/editcomment', component: UpdateCommentComponent, canActivate: [AfterLoginService]}    
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [LoginComponent,RegisterComponent]
