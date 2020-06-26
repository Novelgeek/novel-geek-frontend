import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-book-home',
  templateUrl: './book-home.component.html',
  styleUrls: ['./book-home.component.scss']
})
export class BookHomeComponent implements OnInit {
  public searchTerm='';
  constructor(private router:Router) { }

  ngOnInit() {
  }
  search(){
    console.log("searching");
    this.router.navigate(['search'],{queryParams:{searchTerm:this.searchTerm} });
  }

}
