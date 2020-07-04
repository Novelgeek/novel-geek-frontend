import { Component, OnInit, Input } from '@angular/core';
import {CommentComponent} from '../comment/comment.component'
import { AuthService } from 'app/core/_services/auth.service';
import { BooksService } from '../../books.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  @Input() userName: any;
  @Input() timestamp: any;
  @Input() noOfLikes: any;
  @Input() description: any;
  @Input() imageUrl: any;
  @Input() reviewId: any;
  @Input() comments: any = [];
  @Input() bookId: any;
  data: any = [];
  commentDescription:any = '';
  commentData: any = [];
  isCollapsed = true;
  showShortDesciption = true;

  constructor(private authService: AuthService, private bookService: BooksService,private router:Router) { }

  ngOnInit(): void {
    if (this.imageUrl == null) {
      this.imageUrl = '../../../../../assets/books/default.png';
    }
  }
  alterDescriptionText() {
    this.showShortDesciption = !this.showShortDesciption
  }
  onAddComment() {
    const commentData = {
      commentedUserId: this.authService.currentUser.id,
      reviewId:this.reviewId,
      commentDescription:this.commentDescription
    }
    this.bookService.addComment(commentData).subscribe({
      next: data => {
        console.log(data);
        this.data = data;
        this.comments = this.data.comments;
        this.commentDescription='';

        // window.location.reload();
        // this.rou(['/books']);ter.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        //   this.router.navigate
        //   // this.router.navigate(['/reviewbook'], {queryParams : {bookId : this.bookId}});
        //  });  
      },
      error: error => console.error('There was an error!', error)
    })

  }

}
