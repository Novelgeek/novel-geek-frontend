import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';


import { PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { HomeLayoutComponent } from './layouts/home-layout.component';
import { LoginLayoutComponent } from './layouts/login-layout.component';
import { SignupComponent } from './pages/auth/signup/signup.component';
import { BookHomeComponent } from './pages/books/book-home/book-home.component';
import { FriendsHomeComponent } from './pages/friends/friends-home/friends-home.component';
import { GroupHomeComponent } from './pages/groups/group-home/group-home.component';
import { MessageHomeComponent } from './pages/messages/message-home/message-home.component';
import { PollsHomeComponent } from './pages/polls/polls-home/polls-home.component';
import { PostsHomeComponent } from './pages/posts/posts-home/posts-home.component';
import { ProfileHomeComponent } from './pages/profile/profile-home/profile-home.component';
import { SalesHomeComponent } from './pages/sales/sales-home/sales-home.component';

import { from } from 'rxjs';

import { BookletComponent } from './pages/books/booklet/booklet.component';
import { StoreComponent } from './pages/books/store/store.component';


import { SearchResultsComponent } from './pages/books/search-results/search-results.component';
import { BookReviewComponent } from './pages/books/book-review/book-review.component';
import { ReviewComponent } from './pages/books/book-review/review/review.component';
import { CommentComponent } from './pages/books/book-review/comment/comment.component';


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
    HomeLayoutComponent,
    LoginLayoutComponent,
    SignupComponent,
    BookHomeComponent,
    FriendsHomeComponent,
    GroupHomeComponent,
    MessageHomeComponent,
    PollsHomeComponent,
    PostsHomeComponent,
    ProfileHomeComponent,
    SalesHomeComponent,
    BookletComponent,
    StoreComponent,
    SearchResultsComponent,
    BookReviewComponent,
    ReviewComponent,
    CommentComponent
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    NgbModule,

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
    { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
