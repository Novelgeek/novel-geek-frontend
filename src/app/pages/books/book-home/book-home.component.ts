import { Component, OnInit, ViewChild } from '@angular/core';
import { SwiperComponent } from 'ngx-useful-swiper';
import { SwiperOptions } from 'swiper';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { BooksService } from '../books.service';
import { Autoplay } from 'swiper/js/swiper.esm';
import { MatDialog } from '@angular/material/dialog';
import { FanFictionComponent } from './fan-fiction/fan-fiction.component';
import { from } from 'rxjs';
import { ViewFanFictionComponent } from './view-fan-fiction/view-fan-fiction.component';
import { AuthService } from 'app/core/_services/auth.service';

@Component({
  selector: 'app-book-home',
  templateUrl: './book-home.component.html',
  styleUrls: ['./book-home.component.scss'],
})
export class BookHomeComponent implements OnInit {
  // image slider configuration
  @ViewChild('usefulSwiper', { static: false }) usefulSwiper: SwiperComponent;
  config: SwiperOptions;
  currentUser: any;

  public searchTerm = '';
  public recommendations: any;
  public recentlyViewed: any;
  public featured: any;
  public localBooks: any;
  constructor(
    private router: Router,
    private bookService: BooksService,
    public dialog: MatDialog,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.bookService.getRecommendations().subscribe((data) => {
      this.recommendations = data;
    });
    this.bookService.getRecentlyViewed().subscribe((data) => {
      this.recentlyViewed = data;
    });
    this.bookService.getFeaturedBooks().subscribe((data) => {
      this.featured = data;
    });
    this.bookService.getAllLocalBooks().subscribe((data) => {
      this.localBooks = data;
    });

    this.config = {
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
          slidesPerView: 4,
        },
        500: {
          slidesPerView: 3,
        },
        400: {
          slidesPerView: 2,
        },
        300: {
          slidesPerView: 1,
        },
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
        },
      },
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

  search() {
    this.router.navigate(['/books/search'], {
      queryParams: { searchTerm: this.searchTerm },
    });
  }

  fanFictionDialog() {
    const dialogRef = this.dialog.open(FanFictionComponent, {
      autoFocus: false,
      width: '2000px',
      maxHeight: '90vh',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  viewFanFictionDialog() {
    const dialogRef = this.dialog.open(ViewFanFictionComponent, {
      autoFocus: false,
      width: '2000px',
      maxHeight: '90vh',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
