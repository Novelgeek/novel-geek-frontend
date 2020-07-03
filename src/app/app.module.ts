import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';


import { PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { HomeLayoutComponent } from './layouts/home-layout.component';
import { SignupComponent } from './pages/auth/signup/signup.component';
import { BookHomeComponent } from './pages/books/book-home/book-home.component';
import { FriendsHomeComponent } from './pages/friends/friends-home/friends-home.component';
import { GroupHomeComponent } from './pages/groups/group-home/group-home.component';
import { MessageHomeComponent } from './pages/messages/message-home/message-home.component';
import { PollsHomeComponent } from './pages/polls/polls-home/polls-home.component';
import { PostsHomeComponent } from './pages/posts/posts-home/posts-home.component';
import { PostModalComponent } from './pages/posts/post-modal/post-modal.component';
import { ProfileHomeComponent } from './pages/profile/profile-home/profile-home.component';
import { SalesHomeComponent } from './pages/sales/sales-home/sales-home.component';
import { ProfileSettingsComponent } from './pages/profile/profile-settings/profile-settings.component';
import { TokenInterceptor } from './core/_services/token.interceptor';

import { MatSliderModule } from '@angular/material/slider';



import { BookletComponent } from './pages/books/booklet/booklet.component';
import { StoreComponent } from './pages/books/store/store.component';


import { SearchResultsComponent } from './pages/books/search-results/search-results.component';
import { BookReviewComponent } from './pages/books/book-review/book-review.component';
import { ReviewComponent } from './pages/books/book-review/review/review.component';
import { CommentComponent } from './pages/books/book-review/comment/comment.component';

import { GroupCardComponent } from './pages/groups/group-card/group-card.component';
import { GroupHorizontalCardComponent } from './pages/groups/group-horizontal-card/group-horizontal-card.component';
import { GroupDetailComponent } from './pages/groups/group-detail/group-detail.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AdminLayoutComponent } from './layouts/admin-layout.component';
import { AdminHomeComponent } from './pages/admin/admin-home/admin-home.component';
import { AdminAuthComponent } from './pages/admin/admin-auth/admin-auth.component';
import { ForgotPasswordComponent } from './pages/auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './pages/auth/reset-password/reset-password.component';
import { from } from 'rxjs';
import { FriendCardComponent } from './pages/friends/friend-card/friend-card.component';
import { AuctionHomeComponent } from './pages/auction/auction-home/auction-home.component';
import { AuctionCardComponent } from './pages/auction/auction-card/auction-card.component';

import {MatInputModule} from '@angular/material/input';

import {MatButtonModule} from '@angular/material/button';
export function tokenGetter() {
  return localStorage.getItem("token");
}

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true,
    wheelPropagation: false
  };

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    HomeLayoutComponent,
    AdminLayoutComponent,
    AdminHomeComponent,
    AdminAuthComponent,
    SignupComponent,
    BookHomeComponent,
    FriendsHomeComponent,
    FriendCardComponent,
    GroupHomeComponent,
    MessageHomeComponent,
    PollsHomeComponent,
    PostsHomeComponent,
    PostModalComponent,
    ProfileHomeComponent,
    SalesHomeComponent,
    ProfileSettingsComponent,


    BookletComponent,
    StoreComponent,
    SearchResultsComponent,
    BookReviewComponent,
    ReviewComponent,
    CommentComponent,

    GroupCardComponent,
    GroupHorizontalCardComponent,
    GroupDetailComponent,
    NotFoundComponent,
    AuctionHomeComponent,
    AuctionCardComponent
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    NgbModule,
    
    MatSliderModule,
    MatInputModule,
    MatButtonModule,
    PerfectScrollbarModule,
    FormsModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    NgxUsefulSwiperModule,  
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ["example.com"],
        blacklistedRoutes: ["http://example.com/examplebadroute/"],
      },
    }),
    NgxUsefulSwiperModule
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
