import { Component, OnInit, ViewChild , EventEmitter, OnDestroy } from '@angular/core';
import { AuthService } from 'app/core/_services/auth.service';
import { Subscription } from 'rxjs';


// imports for image slider
import { SwiperOptions } from 'swiper';
import { SwiperComponent } from 'ngx-useful-swiper';
import { BooksService } from 'app/pages/books/books.service';
import { PostsService } from 'app/core/_services/posts.service';
import { UserService } from 'app/core/_services/user.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import Post_modal from 'app/pages/posts/post_modal';
import { NgForm } from '@angular/forms';
//
@Component({
  selector: 'app-profile-home',
  templateUrl: './profile-home.component.html',
  styleUrls: ['./profile-home.component.scss']
})
export class ProfileHomeComponent implements OnInit, OnDestroy {

  private userSub: Subscription;
  user: any;
  userId:number;
  isAuthenticated = false;


  url: any = null;
  selectedImage: File;
  image: string;
  allBooks: any;
  highRated: any;
  lowRated: any;
  postList: Post_modal[];
  public recommendations: any;

  // image slider configuration
  @ViewChild('usefulSwiper', { static: false }) usefulSwiper: SwiperComponent;
  config: SwiperOptions;


  constructor(
    private authService: AuthService,
    private bookService: BooksService,
    private postsService: PostsService,
    private userService: UserService,
    private toastr: ToastrService, private spinner: NgxSpinnerService
    ) { 
      this.postList = [];
    }

    ngOnDestroy(): void {
      this.userSub.unsubscribe();
    }



  ngOnInit() {
    this.userSub = this.authService.user.subscribe( user => {
      this.isAuthenticated = !!user; // !user ? false : true
      this.user = user;
      this.userId = +this.authService.currentUser.id;
      this.url = user.photoUrl;
      
    });

    //load recommendation

    this.bookService.getRecommendations().subscribe(data => {
      this.recommendations = data;
    });


    //load book list 
    this.bookService.getMyBookRatings().subscribe(data => {
      console.log(data)
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

    // load posts of users

    this.spinner.show();
    this.postsService.getMyPosts().subscribe(response => {
      this.postList = response;
      this.spinner.hide();
    }, errorMsg => {
      this.spinner.hide()
    })
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

  onSubmit(){
    this.spinner.show();
    const formData = new FormData();
    formData.append('file', this.selectedImage);
    this.userService.uploadImage(formData,this.userId).subscribe(response => {
     
      
      this.spinner.hide();
      this.toastr.success('Profile Picture Uploaded succesfully');
      this.authService.imageUpdated(response.imageUrl)

    }, errorMsg => {
      this.spinner.hide();
      this.toastr.error('Unable to upload the image.');
    })
  }

  // image upload

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url
      this.selectedImage = event.target.files[0]
      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result;
      }
      this.onSubmit();

    }
  }
  public delete() {
    this.url = null;
  }

  onDeletePost(data: {id: number}) {
    this.postList.splice(data.id, 1);
  }

}

