import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {BooksService} from '../books.service';
import { DomSanitizer } from '@angular/platform-browser';
import { SanitizeHtmlPipe } from './sanitize-html';
@Component({
  selector: 'app-book-review',
  templateUrl: './book-review.component.html',
  styleUrls: ['./book-review.component.css']
})

export class BookReviewComponent implements OnInit {
  bookId: any;
  data:any=[];
  book:any=[];
  section=false;
  comments:any = [1, 2, 3, 4]
  showShortDesciption = true;
  constructor(private bookService: BooksService,private route:ActivatedRoute) { }

  ngOnInit(): void {
      this.route.queryParams.subscribe(params => {
        this.bookId = params.bookId;
      });
      this.bookService.getBooksById(this.bookId).subscribe(data=>{
        console.log(data);
        this.data=data;
        this.book=this.data.volumeInfo;
      });
  }
  alterDescriptionText() {
    this.showShortDesciption = !this.showShortDesciption
 }
  onAddReview(){

  }


}
