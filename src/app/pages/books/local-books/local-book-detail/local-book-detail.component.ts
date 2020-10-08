import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { BooksService } from '../../books.service';

@Component({
  selector: 'app-local-book-detail',
  templateUrl: './local-book-detail.component.html',
  styleUrls: ['./local-book-detail.component.scss'],
})
export class LocalBookDetailComponent implements OnInit {
  review: any;
  bookId: any;
  reviews: any = [];
  book: any;

  constructor(
    private bookService: BooksService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.bookId = +params['id'];
    });

    this.bookService.getSpecificLocalBook(this.bookId).subscribe((data) => {
      console.log(data);
      this.book = data;
    });

    this.bookService.getLocalBookReviews(this.bookId).subscribe((data) => {
      this.reviews = data;
    });
  }

  onAddReview() {
    this.spinner.show();
    this.bookService.addReviewLocal(this.review, this.bookId).subscribe(
      (data) => {
        this.spinner.hide();
        this.reviews.push(data);
        this.modalService.dismissAll();
      },
      (error) => {
        this.spinner.hide();
        this.modalService.dismissAll();
      }
    );
  }

  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: 'addReview' })
      .result.then(
        (result) => {},
        (reason) => {}
      );
  }
}
