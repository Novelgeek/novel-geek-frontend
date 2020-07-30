import { Component, OnInit } from '@angular/core';
import { BooksService } from '../books.service';

@Component({
  selector: 'app-local-books',
  templateUrl: './local-books.component.html',
  styleUrls: ['./local-books.component.scss']
})
export class LocalBooksComponent implements OnInit {

  localBooks: any;
  constructor(private bookService: BooksService ) { }

  ngOnInit() {
    this.bookService.getAllLocalBooks().subscribe(data => {
      this.localBooks = data
      console.log(data)
    })
  }

}
