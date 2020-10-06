import { Component, OnInit, ViewChild , EventEmitter, OnDestroy } from '@angular/core';
import { AuthService } from 'app/core/_services/auth.service';
import { Subscription } from 'rxjs';
// imports for image slider
import { SwiperOptions } from 'swiper';
import { SwiperComponent } from 'ngx-useful-swiper';
import { BooksService } from 'app/pages/books/books.service';
//
@Component({
  selector: 'app-profile-home',
  templateUrl: './profile-home.component.html',
  styleUrls: ['./profile-home.component.scss']
})
export class ProfileHomeComponent implements OnInit, OnDestroy {

  private userSub: Subscription;
  public user: any;
  isAuthenticated = false;
  public url: any = null;

  public allBooks: any;
  public highRated: any;
  public lowRated: any;

  // image slider configuration
  @ViewChild('usefulSwiper', { static: false }) usefulSwiper: SwiperComponent;
  swconfig: SwiperOptions;

  constructor(
    private authService: AuthService,
    private bookService: BooksService
    ) { }

    ngOnDestroy(): void {
      this.userSub.unsubscribe();
    }



  ngOnInit() {
    this.userSub = this.authService.user.subscribe( user => {
      this.isAuthenticated = !!user; // !user ? false : true
      this.user = user;
      this.url = user.photoUrl;
    });

    this.bookService.getMyBookRatings().subscribe(data => {
      this.allBooks = data;
      this.highRated = this.allBooks.filter(book => {
        return book.rating > 2
      })
      this.lowRated = this.allBooks.filter(book => {
        return book.rating <= 2
      })
      console.log(this.highRated);
      console.log(this.lowRated);

    }, errorMsg => {
      console.log(errorMsg);
    })

    this.swconfig = {

      pagination: { el: '.swiper-pagination', clickable: true },
      height: 240,
      autoHeight: false,
      allowTouchMove: true,
      // autoplay: {
      //   delay: 500,
      //   disableOnInteraction: true
      // },
      breakpoints: {
        1024: {
          slidesPerView: 4
        },
        500: {
          slidesPerView: 3
        },
        400: {
          slidesPerView: 2
        },
        300: {
          slidesPerView: 1
        }
      },
      navigation: {
        nextEl: '.swiper-button-next  ',
        prevEl: '.swiper-button-prev',
        hideOnClick: true,
      },
      simulateTouch: true,
      watchOverflow: true,
      spaceBetween: 30,
      loop: true,
      speed: 400,

      on: {
        slideChange: () => {
          // console.log('slideChange Event: Active Slide Index = ', this.usefulSwiper.swiper.activeIndex);

        },
        slideChangeTransitionEnd: () => {
          // console.log('slideChange Event');
        }
      }

    };
}

   nextSlide() {
    this.usefulSwiper.swiper.slideNext();
  }

  previousSlide() {
    this.usefulSwiper.swiper.slidePrev();
  }

  slideToThis(index) {
    this.usefulSwiper.swiper.slideTo(index);
  }

  // image slider configuration ends

  // image upload

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result;
      }
    }
  }
  public delete() {
    this.url = null;
  }

}

