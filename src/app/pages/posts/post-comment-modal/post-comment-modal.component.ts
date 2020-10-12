import { Component, OnInit, ViewChild, Input, EventEmitter, Output} from '@angular/core';
import { PostsService } from 'app/core/_services/posts.service';
import { NgForm } from '@angular/forms';
import { Comment_modal } from '../comment_modal';
import {Comment_reply_modal} from '../comment_reply_modal';
@Component({
  selector: 'app-post-comment-modal',
  templateUrl: './post-comment-modal.component.html',
  styleUrls: ['./post-comment-modal.component.scss']
})
export class PostCommentModalComponent implements OnInit {
  @Output() ondelete  = new EventEmitter <{id: number}> ();
  @Input() comment: Comment_modal;
  @Input() commentindex: number;
  @ViewChild('addreply') addreply: NgForm;
  isreply: boolean = false;
  replyList: Comment_reply_modal [];
  showreply: boolean = false;
  public new_reply: Comment_reply_modal;
  constructor(private postService: PostsService) {
    this.replyList = [];
    this.new_reply = new Comment_reply_modal();
   }

  ngOnInit() {
  }

  Reply(){
    this.isreply = !this.isreply;
  }

  onsubmitReply(Values: any, commentid: number){
    //console.log(commentid);
    //console.log(Values);
    this.postService.addReply(Values.reply, commentid )
    .subscribe(response => {
      this.new_reply = response;
      this.replyList.splice(0, 0, this.new_reply);
      
    })
    this.addreply.reset();
  }

  ShowReply(commentid:number){
    this.showreply = !this.showreply;
    if(this.showreply){
      this.postService.getReplies(commentid).subscribe(response => {
        this.replyList = response;
        //console.log(response);
      })
    }
  }

  deleteComment(commentid:number){
    this.postService.deleteComment(commentid).
    subscribe(response => {
      this.ondelete.emit({id: this.commentindex});
    })
  }

  deleteReply(replyid:number, index:number){
    this.postService.deleteReply(replyid).
    subscribe(response => {
      this.replyList.splice(index, 1);
    })
    //console.log(replyid)
  }
}
