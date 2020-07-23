import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() userName: any;
  @Input() comment: any;
  @Input() timestamp: any;
  @Input() imageUrl: any;
  constructor() { }

  ngOnInit(): void {
    if (this.imageUrl == null) {
      this.imageUrl = '../../../../../assets/books/default.png';
    }
  }

}
