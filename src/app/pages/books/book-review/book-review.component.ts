import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {BooksService} from '../books.service';
import { DomSanitizer } from '@angular/platform-browser';
import { SanitizeHtmlPipe } from './sanitize-html';
import {ReviewComponent} from './review/review.component'
import { Book } from 'app/core/_models/book.model';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-book-review',
  templateUrl: './book-review.component.html',
  styleUrls: ['./book-review.component.css']
})

export class BookReviewComponent implements OnInit, OnDestroy {
  bookId: any;
  data: any = [];
  book: any = {};
  section = false;
  reviews: any = [];
  sub: Subscription;
  rating = 0;
  hovered = 0;
  myReview: String;
  constructor(private bookService: BooksService, private route: ActivatedRoute, private spinner: NgxSpinnerService,
    private modalService: NgbModal) { }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.spinner.show();
      this.sub = this.route.params.subscribe(params => {
        this.bookId = params['id'];
      });
      this.bookService.getBooksById(this.bookId).subscribe(data => {
        this.data = data;
        this.book = this.data.volumeInfo;
        const bookDetail = new Book(this.bookId, this.book.title, this.book.authors[0], this.rating, this.book.imageLinks.thumbnail);
        // tslint:disable-next-line: no-shadowed-variable
        this.bookService.getUserRating(this.bookId).subscribe( data => {
          if( data !== null) {
            this.rating = +data;
          }
          this.spinner.hide()
        }, err => this.spinner.hide())

        this.bookService.updateRecentlyViewed(bookDetail).subscribe(data => {
          // console.log(data);
        }, errorMsg => {
          console.log(errorMsg);
          this.spinner.hide();
        });
      });
      this.bookService.getReviews(this.bookId).subscribe(data => {
        console.log(data);
        this.reviews = data;
      });

  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'create-group'}).result.then((result) => {
    }, (reason) => {
    });
  }

  onAddReview() {
    this.spinner.show();
    this.bookService.addReview(this.myReview, this.bookId).subscribe(data => {
      this.spinner.hide();
      this.reviews.push(data);
      this.modalService.dismissAll();
    }, error => this.spinner.hide())
  }

  onRate() {
    const bookDetail = new Book(this.bookId, this.book.title, this.book.authors[0], this.rating, this.book.imageLinks.thumbnail);
    // console.log(bookDetail);
    this.bookService.rateBook(bookDetail).subscribe(data => {
      console.log(data);
    }, errorMsg => {
      console.log(errorMsg);
    })
  }
}
