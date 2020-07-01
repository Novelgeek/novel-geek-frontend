import { Component, OnInit, Input } from '@angular/core';
import {BooksService} from '../books.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-booklet',
  templateUrl: './booklet.component.html',
  styleUrls: ['./booklet.component.css'],
})


export class BookletComponent implements OnInit {
  @Input() bookId:any;
  @Input() title: any;
  @Input() authors: any;
  @Input() description: any;
  @Input() averageRating: any;
  @Input() pagecount: any;
  @Input() imageLink: any;

  constructor(private bookService: BooksService,private route:ActivatedRoute,private router:Router) {// dependency injection

  }
  ngOnInit(): void {
  
  }
  reviewBook(){
    this.router.navigate(['/reviewbook'],{queryParams : {bookId : this.bookId}});
  }
  

}
