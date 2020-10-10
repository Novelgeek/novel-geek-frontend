import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {BooksService} from '../books.service';
import {BookletComponent} from '../booklet/booklet.component'
import { NgxSpinnerService } from 'ngx-spinner';
import { error } from 'console';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  searchTerm = '';
  info: any;
  books: any = [];
  constructor(private bookService: BooksService, private route: ActivatedRoute, private spinner: NgxSpinnerService ) { }

  ngOnInit(): void {
    this.spinner.show()
    this.route.queryParams.subscribe(params => {
      console.log(params.searchTerm);
      this.searchTerm = params.searchTerm;
    });
    this.search();
  }

  search() {
    if (this.searchTerm !== '') {

      this.bookService.getBooks(this.searchTerm).subscribe(
        (data) => {
          console.log(data)
          this.info = data;
          this.books = this.info.items;
          this.spinner.hide();
      }, error => {
        console.log(error);
        
        this.spinner.hide();
      });
    } else {
      this.info = [];
      this.books = [];
      this.spinner.hide();
    }
  }

}
