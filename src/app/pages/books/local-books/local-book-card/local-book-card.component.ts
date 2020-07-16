import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-local-book-card',
  templateUrl: './local-book-card.component.html',
  styleUrls: ['./local-book-card.component.scss']
})
export class LocalBookCardComponent implements OnInit {
  @Input() book: any;
  constructor() { }

  ngOnInit() {
  }

}
