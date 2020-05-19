import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { LOCALE_ID } from '@angular/core';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AnotherProfileComponent } from './another-profile/another-profile.component';
import { CommentComponent } from './comment/comment.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { UpdatePostComponent } from './update-post/update-post.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { AddCommentComponent } from './add-comment/add-comment.component';
import { UpdateCommentComponent } from './update-comment/update-comment.component';

registerLocaleData(localeDe);

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    ProfileComponent,
    NavbarComponent,
    DashboardComponent,
    AnotherProfileComponent,
    CommentComponent,
    CreatePostComponent,
    UpdatePostComponent,
    UpdateUserComponent,
    AddCommentComponent,
    UpdateCommentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [{provide: LOCALE_ID, useValue: 'de'}],
  bootstrap: [AppComponent]
})
export class AppModule {
  
 }
