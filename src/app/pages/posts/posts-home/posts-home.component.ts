import { Component, OnInit } from '@angular/core';
//import Post_modal from 'src/app/posts/post_modal';
import Post_modal from '../post_modal';
//import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-posts-home',
  templateUrl: './posts-home.component.html',
  styleUrls: ['./posts-home.component.scss']
})
export class PostsHomeComponent implements OnInit {

  public postList: Post_modal[];
  public new_post: Post_modal;
  public url:any;
  public flag:string="#009da0";
  isShow=false;
  
  constructor(/*public sanitizer:DomSanitizer*/) { 
    this.new_post=new Post_modal();
    this.postList=[];
  }

  ngOnInit() {
    console.log("working")
  }

  onsubmit(value: any){
    //this.postList.push(this.new_post);

    //add to given position
    this.new_post.postedDate=new Date();
    this.postList.splice(0,0,this.new_post);
    this.new_post=new Post_modal();
    //console.log(value);
  }

  public likeCount(item: Post_modal){
    //this.flag="red";
    item.likeCount+=1;
    //this.flag="#009da0";
  }

  public uploadImage(event){
    // const ref_element =event.target;
    // const photo=ref_element.files[0];
    // const url_el=URL.createObjectURL(photo);
    // this.url=this.sanitizer.bypassSecurityTrustResourceUrl(url_el);
    // this.new_post.imageURL=this.url;

    if(event.target.files){
      var reader= new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload=(event:any)=>{
        this.new_post.imageURL=event.target.result;
      }
    }
  }

  // public postStory(){
  // }

  public toggleList(item){
    item.isShow=!item.isShow;
  }
}
