import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {BooksService} from '../books.service';
import { DomSanitizer } from '@angular/platform-browser';
import { SanitizeHtmlPipe } from './sanitize-html';
import {ReviewComponent} from './review/review.component'
@Component({
  selector: 'app-book-review',
  templateUrl: './book-review.component.html',
  styleUrls: ['./book-review.component.css']
})

export class BookReviewComponent implements OnInit {
  bookId: any;
  data: any = [];
  book: any = [];
  section = false;
  reviews: any = [];

  constructor(private bookService: BooksService, private route: ActivatedRoute) { }

  ngOnInit(): void {
      this.route.queryParams.subscribe(params => {
        this.bookId = params.bookId;
      });
      this.bookService.getBooksById(this.bookId).subscribe(data => {
        console.log(data);
        this.data = data;
        this.book = this.data.volumeInfo;
      });
      this.bookService.getReviews(this.bookId).subscribe(data=>{
        console.log(data);
        this.reviews = data;
      });
  }

  onAddReview() {

  }


}
