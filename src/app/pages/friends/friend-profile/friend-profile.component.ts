import { Component, OnInit, ViewChild , EventEmitter, OnDestroy, Output } from '@angular/core';
import { AuthService } from 'app/core/_services/auth.service';
import { Subscription } from 'rxjs';


// imports for image slider
import { SwiperOptions } from 'swiper';
import { SwiperComponent } from 'ngx-useful-swiper';
import { BooksService } from 'app/pages/books/books.service';
import { PostsService } from 'app/core/_services/posts.service';
import { UserService } from 'app/core/_services/user.service';
import { FriendService } from 'app/core/_services/friend.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import Post_modal from 'app/pages/posts/post_modal';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-friend-profile',
  templateUrl: './friend-profile.component.html',
  styleUrls: ['./friend-profile.component.scss']
})
export class FriendProfileComponent implements OnInit, OnDestroy {

  private userSub: Subscription;
  user: any;
  userId: number;
  isAuthenticated = false;

  url: any = null;
  selectedImage: File;
  image: string;
  allBooks: any = [];
  highRated: any;
  lowRated: any;
  postList: Post_modal[];
  firstname: any
  email: string;
  username: any;

  // image slider configuration
  @ViewChild('usefulSwiper', { static: false }) usefulSwiper: SwiperComponent;
  swconfig: SwiperOptions;

  @Output() unFriend = new EventEmitter();

  constructor(
    private authService: AuthService,
    private bookService: BooksService,
    private postsService: PostsService,
    private userService: UserService,
    private friendService: FriendService,
    private toastr: ToastrService, private spinner: NgxSpinnerService,
    private route: ActivatedRoute
    ) {
      this.postList = [];
    }

    ngOnDestroy(): void {

    }



  ngOnInit() {

    this.route.params.subscribe(params => {
      this.userId = +params['id'];
    });

    // get user from server
    this.userService.getUser(this.userId).subscribe(data => {
     this.user = data
     this.username = data.username
     this.email = data.email
     this.url = data.imageUrl
     // console.log(this.user)
      // console.log(this.email)
      // this.email=this.user.email

        // load user posts
        this.spinner.show();
        this.postsService.getUserPost(this.email).subscribe(response => {
          this.postList = response;
          this.spinner.hide();
          }, errorMsg => {
          this.spinner.hide()
          })


        // load user rated books
        this.bookService.getFriendBookRatings(this.email).subscribe(data => {
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
//oninit ends here



  nextSlide() {
    this.usefulSwiper.swiper.slideNext();
  }

  previousSlide() {
    this.usefulSwiper.swiper.slidePrev();
  }

  slideToThis(index) {
    this.usefulSwiper.swiper.slideTo(index);
  }

  // image upload - take form data

  onSubmit(form: NgForm) {
    this.spinner.show();
    const formData = new FormData();
    formData.append('file', this.selectedImage);
    this.userService.uploadImage(formData, this.userId).subscribe(response => {
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

  // delet post
  onDeletePost(data: {id: number}) {
    this.postList.splice(data.id, 1);
  }


  // send friend request
  sendFriendRequest() {

    this.spinner.show()
    this.friendService.sendFriendRequest(this.userId).subscribe(data => {
      this.user.status = 'REQUESTED';
      this.toastr.success('Friend request sent to  ' + this.username);
      this.spinner.hide()
    }, errorMsg => {
      this.toastr.error('Unable to send friend request to ' + this.username)
      this.spinner.hide()
    })
  }

  unFriendUser() {
    this.spinner.show()
    this.friendService.unFriend(this.userId).subscribe(data => {
      this.user.friend = false;
      this.toastr.info('Unfriended ' + this.username);
      this.unFriend.emit({status: true, userId: this.userId});
      this.spinner.hide()
    }, errorMsg => {
      this.toastr.error('Unable to unfriend ' + this.username + ', Please try again later.')
      this.spinner.hide()
    })
  }

  cancelSentRequest() {
    this.spinner.show()
    this.friendService.cancelSentRequest(this.userId).subscribe(data => {
      this.user.status = null;
      this.toastr.info('Friend request to  ' + this.username + ' has been cancelled');
      this.spinner.hide()
    }, errorMsg => {
      this.toastr.error('Unable to cancel the friend request sent to ' + this.username)
      this.spinner.hide()
    })
  }


}
