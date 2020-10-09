import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { HomeLayoutComponent } from './layouts/home-layout.component';
import { FriendsHomeComponent } from './pages/friends/friends-home/friends-home.component';
import { BookHomeComponent } from './pages/books/book-home/book-home.component';
import { GroupHomeComponent } from './pages/groups/group-home/group-home.component';
import { MessageHomeComponent } from './pages/messages/message-home/message-home.component';
import { PollsHomeComponent } from './pages/polls/polls-home/polls-home.component';
import { PostsHomeComponent } from './pages/posts/posts-home/posts-home.component';
import { ProfileHomeComponent } from './pages/profile/profile-home/profile-home.component';
import { ProfileSettingsComponent } from './pages/profile/profile-settings/profile-settings.component';
import { SalesHomeComponent } from './pages/sales/sales-home/sales-home.component';
import { SignupComponent } from './pages/auth/signup/signup.component';

import { AuthGuard } from './core/_guards/auth.guard';
import { GroupDetailComponent } from './pages/groups/group-detail/group-detail.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AdminAuthComponent } from './pages/admin/admin-auth/admin-auth.component';
import { AdminLayoutComponent } from './layouts/admin-layout.component';
import { AdminHomeComponent } from './pages/admin/admin-home/admin-home.component';
import { ForgotPasswordComponent } from './pages/auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './pages/auth/reset-password/reset-password.component';

import {BookletComponent} from './pages/books/booklet/booklet.component'
import {BookReviewComponent} from './pages/books/book-review/book-review.component'
import {SearchResultsComponent} from './pages/books/search-results/search-results.component'


import {HttpClientModule} from '@angular/common/http';
import { ManagePostsComponent } from './pages/admin/manage-posts/manage-posts.component';
import { ManageAdminsComponent } from './pages/admin/manage-admins/manage-admins.component';
import { AuctionHomeComponent } from './pages/auction/auction-home/auction-home.component';
import { AddBookComponent } from './pages/books/add-book/add-book.component';
import { LocalBooksComponent } from './pages/books/local-books/local-books.component';
import { FriendProfileComponent } from './pages/friends/friend-profile/friend-profile.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'forgot-password', component: ForgotPasswordComponent},
  { path: 'reset-password', component: ResetPasswordComponent},
  { path: 'admin/login', component: AdminAuthComponent},
  { path: 'admin', component: AdminLayoutComponent,
    children: [
      {path: 'home', component: AdminHomeComponent},
      {path: 'posts', component: ManagePostsComponent},
      {path: 'admins', component: ManageAdminsComponent},
      {path: '**', component: NotFoundComponent},
    ]
  },
  { path: '', component: HomeLayoutComponent, canActivate: [AuthGuard],
    children: [
      {path: 'books', component: BookHomeComponent},
      {path: 'books/search/:id', component: BookReviewComponent},
      {path: 'books/search', component: SearchResultsComponent},
      {path: 'books/reviewbook', component: BookReviewComponent},
      {path: 'books/add', component: AddBookComponent},
      {path: 'books/local-books', component: LocalBooksComponent},
      {path: 'auctions', component: AuctionHomeComponent},

      {path: 'friends', component: FriendsHomeComponent},
      {path: 'friends/:id', component: FriendProfileComponent},
      {path: 'groups', component: GroupHomeComponent},
      {path: 'groups/:id', component: GroupDetailComponent},
      {path: 'messages', component: MessageHomeComponent},
      {path: 'polls', component: PollsHomeComponent},
      {path: 'posts', component: PostsHomeComponent},
      {path: 'profile', component: ProfileHomeComponent},
      {path: 'sales', component: SalesHomeComponent},
      {path: 'profile/settings', component: ProfileSettingsComponent},
      {path: 'booklet', component: BookletComponent},
      {path: '', component: PostsHomeComponent},
      {path: '404', component: NotFoundComponent},
      {path: '**', component: NotFoundComponent},

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
