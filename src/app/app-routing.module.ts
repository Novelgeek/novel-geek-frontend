import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { LoginLayoutComponent } from './layouts/login-layout.component';
import { HomeLayoutComponent } from './layouts/home-layout.component';
import { FriendsHomeComponent } from './pages/friends/friends-home/friends-home.component';
import { BookHomeComponent } from './pages/books/book-home/book-home.component';
import { GroupHomeComponent } from './pages/groups/group-home/group-home.component';
import { MessageHomeComponent } from './pages/messages/message-home/message-home.component';
import { PollsHomeComponent } from './pages/polls/polls-home/polls-home.component';
import { PostsHomeComponent } from './pages/posts/posts-home/posts-home.component';
import { ProfileHomeComponent } from './pages/profile/profile-home/profile-home.component';
import { SalesHomeComponent } from './pages/sales/sales-home/sales-home.component';
import { SignupComponent } from './pages/auth/signup/signup.component';
import {BookletComponent} from './pages/books/booklet/booklet.component'
import {BookReviewComponent} from './pages/books/book-review/book-review.component'
import {SearchResultsComponent} from './pages/books/search-results/search-results.component'
import {StoreComponent} from './pages/books/store/store.component'

import {HttpClientModule} from '@angular/common/http';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: '', component: HomeLayoutComponent,
    children: [
      {path: 'books', component: BookHomeComponent},
      {path: 'search', component: SearchResultsComponent},
      {path: 'reviewbook', component: BookReviewComponent},
      {path: 'friends', component: FriendsHomeComponent},
      {path: 'groups', component: GroupHomeComponent},
      {path: 'messages', component: MessageHomeComponent},
      {path: 'polls', component: PollsHomeComponent},
      {path: 'posts', component: PostsHomeComponent},
      {path: 'profile', component: ProfileHomeComponent},
      {path: 'sales', component: SalesHomeComponent},
      {path: 'booklet', component: BookletComponent},
      {path: 'store', component: StoreComponent},
      {path: '**', component: PostsHomeComponent},
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {}
