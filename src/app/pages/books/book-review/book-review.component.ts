import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {BooksService} from '../books.service';
import { DomSanitizer } from '@angular/platform-browser';
import { SanitizeHtmlPipe } from './sanitize-html';
import {ReviewComponent} from './review/review.component'
import { Book } from 'app/core/_models/book.model';
import { Subscription } from 'rxjs';
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
  constructor(private bookService: BooksService, private route: ActivatedRoute) { }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
      this.sub = this.route.params.subscribe(params => {
        this.bookId = params['id'];
      });
      this.bookService.getBooksById(this.bookId).subscribe(data => {
        this.data = data;
        this.book = this.data.volumeInfo;
        const bookDetail = new Book(this.bookId, this.book.title, this.book.authors[0], this.rating, this.book.imageLinks.thumbnail);
        this.bookService.updateRecentlyViewed(bookDetail).subscribe(data => {
          // console.log(data);
        }, errorMsg => {
          console.log(errorMsg);
        });
      });
      // this.bookService.getReviews(this.bookId).subscribe(data=>{
      //   console.log(data);
      //   this.reviews = data;
      // });

  }

  onAddReview() {

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
