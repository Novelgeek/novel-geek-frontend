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
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-friend-profile',
  templateUrl: './friend-profile.component.html',
  styleUrls: ['./friend-profile.component.css']
})
export class FriendProfileComponent implements OnInit, OnDestroy {

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

  // image slider configuration
  @ViewChild('usefulSwiper', { static: false }) usefulSwiper: SwiperComponent;
  swconfig: SwiperOptions;

  constructor(
    private authService: AuthService,
    private bookService: BooksService,
    private postsService: PostsService,
    private userService: UserService,
    private toastr: ToastrService, private spinner: NgxSpinnerService,
    private route: ActivatedRoute
    ) { 
      this.postList = [];
    }

    ngOnDestroy(): void {
      this.userSub.unsubscribe();
    }



  ngOnInit() {
    
     this.route.params.subscribe(params => {
      this.userId = +params['id'];
   });

   this.userService.getUser(this.userId).subscribe(user=>{
     this.user=user
      this.url= this.user.imageUrl
   })

   // TODO : get user from backend

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

  onSubmit(form:NgForm){
    this.spinner.show();
    const formData = new FormData();
    formData.append('file', this.selectedImage);
    this.userService.uploadImage(formData,this.userId).subscribe(response => {
      this.spinner.hide();
      this.toastr.success('Profile Picture Uploaded succesfully');
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

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result;
      }
    }
  }
  public delete() {
    this.url = null;
  }

  onDeletePost(data: {id: number}) {
    this.postList.splice(data.id, 1);
  }

}
