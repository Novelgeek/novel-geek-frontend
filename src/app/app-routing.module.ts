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

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: '', component: HomeLayoutComponent,
    children: [
      {path: 'books', component: BookHomeComponent},
      {path: 'friends', component: FriendsHomeComponent},
      {path: 'groups', component: GroupHomeComponent},
      {path: 'messages', component: MessageHomeComponent},
      {path: 'polls', component: PollsHomeComponent},
      {path: 'posts', component: PostsHomeComponent},
      {path: 'profile', component: ProfileHomeComponent},
      {path: 'sales', component: SalesHomeComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
