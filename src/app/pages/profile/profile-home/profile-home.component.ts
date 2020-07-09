import { Component, OnInit,ViewChild ,EventEmitter,OnDestroy } from '@angular/core';
import { AuthService } from 'app/core/_services/auth.service';
import { Subscription } from 'rxjs';
// imports for image slider
import { SwiperOptions } from 'swiper';
import { SwiperComponent } from 'ngx-useful-swiper';
//  
@Component({
  selector: 'app-profile-home',
  templateUrl: './profile-home.component.html',
  styleUrls: ['./profile-home.component.scss']
})
export class ProfileHomeComponent implements OnInit {

  private userSub: Subscription;
  public user: any;
  isAuthenticated = false;
  url: any;
  
  constructor(
    private authService: AuthService
    ) { }

    ngOnDestroy(): void {
      this.userSub.unsubscribe();
    }

  // image slider configuration
  @ViewChild('usefulSwiper', { static: false }) usefulSwiper: SwiperComponent;
  swconfig: SwiperOptions;

  slideData = [
    {
      id: 382,
      name: "Metal bluetooth cyan",
    }, {
      id: 822,
      name: "Avon",
    }, {
      id: 159,
      name: "Infrastructures",
    }, {
      id: 424,
      name: "Users Cotton",
    }, {
      id: 572,
      name: "Haptic Oklahoma Jewelery",
    }, {
      id: 127,
      name: "Circles Integration Street",
    }, {
      id: 1009,
      name: "uniform Communications Tuna",
    }, {
      id: 619,
      name: "North Carolina",
    }, {
      id: 716,
      name: "Eyeballs Rubber",
    }, {
      id: 382,
      name: "Nevada green unleash",
    }
  ]


  ngOnInit() {
    this.userSub = this.authService.user.subscribe( user => {
      this.isAuthenticated = !!user; // !user ? false : true
      this.user = user;
    });

    this.swconfig = {

    pagination: { el: '.swiper-pagination', clickable: true },
    autoHeight: true,
    allowTouchMove: true,
    // autoplay: {
    //   delay: 500,
    //   disableOnInteraction: true
    // },
    
    breakpoints: {
  
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
      hideOnClick:true,
    },
    simulateTouch:true,
    watchOverflow:true,
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

  //image upload

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result;
      }
    }
  }
  public delete(){
    this.url = null;
  }

}

