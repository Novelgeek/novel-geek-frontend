import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from '../books.service';

@Component({
  selector: 'app-local-books',
  templateUrl: './local-books.component.html',
  styleUrls: ['./local-books.component.scss']
})
export class LocalBooksComponent implements OnInit {

  localBooks: any;
  constructor(private bookService: BooksService, private route: ActivatedRoute, private router:Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = function(){
      return false;
    }
   }

  ngOnInit() {
    this.bookService.getAllLocalBooks().subscribe(data => {
      this.localBooks = data
    })


    this.route.queryParams.subscribe(params => {
      if (params.order_id != null && params.bookId != null) {
        console.log(params.order_id, params.bookId);
        
        this.bookService.boostLocalBook(params.bookId, params.order_id).subscribe(data => {
          console.log(data);
          this.router.navigate(['books/local-books'])
        })
      }
    });

  }

}
