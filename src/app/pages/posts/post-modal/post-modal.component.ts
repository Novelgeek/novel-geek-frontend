import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import Post_modal from '../post_modal';
//import { EventEmitter } from 'protractor';
import { PostsService } from 'app/core/_services/posts.service';

@Component({
  selector: 'app-post-modal',
  templateUrl: './post-modal.component.html',
  styleUrls: ['./post-modal.component.scss']
})
export class PostModalComponent implements OnInit {
  @Output() ondelete  = new EventEmitter <{id:number}> ();
  @Input() item : Post_modal;
  @Input() itemindex : number;
 
  isLiked: boolean;
  isShow:boolean = false;
  flag:string = "#009da0"; 
  constructor(private postService:PostsService) { }

  ngOnInit() {
    if(this.item.liked){
      this.flag="red";
      this.isLiked=true;
    }else{
      this.flag="#009da0";
      this.isLiked=false;
    }
  }

  public deletePost(postid:number){
    this.postService.deletePost(postid).
    subscribe(response=>{
      this.isShow = false;
      this.ondelete.emit({id:this.itemindex});  
    })
  }

  public likeCount(postid:number) {
    if(this.isLiked){
      this.postService.unLikePost(postid).subscribe(response=>{
        this.flag="#009da0";
        this.item.likecount-=1;
        this.isLiked=false;
      })
    }else{
      this.postService.likePost(postid).subscribe(response =>{
        this.flag="red";
        this.item.likecount+=1;
        this.flag="red";
        this.isLiked=true;
      })
    }
  }

  public toggleList() {
    this.isShow=!this.isShow;
  }


}
