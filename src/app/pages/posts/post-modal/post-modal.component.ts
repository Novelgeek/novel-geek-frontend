import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import Post_modal from '../post_modal';
// import { EventEmitter } from 'protractor';
import { PostsService } from 'app/core/_services/posts.service';
import { threadId } from 'worker_threads';
import { Comment_modal } from '../comment_modal';
import { Like_modal } from '../like_modal';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-post-modal',
  templateUrl: './post-modal.component.html',
  styleUrls: ['./post-modal.component.scss']
})
export class PostModalComponent implements OnInit {
  @Output() ondelete  = new EventEmitter <{id: number}> ();
  @Input() item: Post_modal;
  @Input() itemindex: number;
  @ViewChild('addcomment') addcomment: NgForm;
  isLiked: boolean;

  showComments:boolean=false;
  showLikes:boolean=false;
  isShow:boolean = false;
  report :boolean = false;

  commentList: Comment_modal [];
  public new_comment: Comment_modal;
  likeList: Like_modal [];

  flag = '#009da0';

  constructor(private postService: PostsService) {
    this.new_comment = new Comment_modal();
    this.likeList = [];
    this.commentList = [];
    this.showLikes = false;
    this.showLikes = false;
    this.report = false;
   }

  ngOnInit() {
    if (this.item.liked) {
      this.flag = 'red';
      this.isLiked = true;
    } else {
      this.flag = '#009da0';
      this.isLiked = false;
    }
  }

  public deletePost(postid: number) {
    this.postService.deletePost(postid).
    subscribe(response => {
      this.isShow = false;
      this.ondelete.emit({id: this.itemindex});
    })
  }


  public reportPost(){
    this.report=true;
    this.isShow=!this.isShow;
  }

  public onsubmitReport(Values: any, postid:number){
    console.log(Values);
    console.log(postid);
    this.report=false;
    this.postService.reportPost(postid, Values.reason).
    subscribe(response =>{
      this.item.reported=true
    })  
  }

  onClose(){
    this.report=false;
    this.isShow=false;   
  }

  public unReportPost(postid:number){
    this.postService.unReportPost(postid).
    subscribe(response =>{
      this.item.reported=false
      this.isShow=!this.isShow;
    })
  }

  public likeCount(postid:number) {
    if(this.isLiked){
      this.postService.unLikePost(postid).subscribe(response=>{
        this.flag="#009da0";
        this.item.likecount-=1;
        this.isLiked=false;
      })
    } else {
      this.postService.likePost(postid).subscribe(response => {
        this.flag = 'red';
        this.item.likecount += 1;
        this.flag = 'red';
        this.isLiked = true;
      })
    }
  }

  public openLikes(postid: number) {
    if (!this.showLikes && !this.showComments) {
      this.postService.getLikes(postid).subscribe(response => {
        this.likeList = response
        this.showLikes = true;
        this.showComments = false;
      })
    }

    if (this.showComments) {
      this.postService.getLikes(postid).subscribe(response => {
        this.likeList = response
        this.showComments = false;
        this.showLikes = true;
      })
    }

    if (this.showLikes) {
      this.postService.getLikes(postid).subscribe(response => {
        this.likeList = response
        this.showComments = false;
        this.showLikes = true;
      })
    }

  }

  public openComments(postid: number) {
    if (!this.showLikes && !this.showComments) {
      this.postService.getComments(postid).subscribe(response => {
        this.commentList = response
        this.showComments = true;
        this.showLikes = false;

      })
    }

    if (this.showLikes) {
      this.postService.getComments(postid).subscribe(response => {
        this.commentList = response
        this.showLikes = false;
        this.showComments = true;
      })
    }

    if (this.showComments) {
      this.postService.getComments(postid).subscribe(response => {
        this.commentList = response
        this.showComments = true;
        this.showLikes = false;
      })
    }
  }

  onsubmit(Values: any, postid: number) {
    this.postService.addComment(Values.comment, postid )
    .subscribe(response => {
      this.new_comment = response;
      this.commentList.splice(0, 0, this.new_comment);
      this.item.commentcount+=1;
    })
    this.addcomment.reset();
  }


  public toggleList() {
    this.isShow = !this.isShow;
  }

  public hideFooter() {
    this.showLikes = false;
    this.showComments = false;
  }

  onDeleteComment(data: {id: number}){
    this.commentList.splice(data.id, 1);
  }
}
