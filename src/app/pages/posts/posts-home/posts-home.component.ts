import { Component, OnInit } from '@angular/core';
// import Post_modal from 'src/app/posts/post_modal';
import Post_modal from '../post_modal';
import { HttpClient } from '@angular/common/http';
import { PostsService } from 'app/core/_services/posts.service';
// import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-posts-home',
  templateUrl: './posts-home.component.html',
  styleUrls: ['./posts-home.component.scss']
})
export class PostsHomeComponent implements OnInit {

  public postList: Post_modal[];
  public new_post: Post_modal;
  public url: any;
  selectedImage: File;
  public flag = '#009da0';
  default = 'Public';
  isShow = false;
  create = false;
  postdelete: number;

  /*public sanitizer:DomSanitizer*/
  constructor(private http: HttpClient, private postsService: PostsService) {
    this.new_post = new Post_modal();
    this.postList = [];
  }

  ngOnInit() {
    console.log('working');
    this.postsService.getAllPosts().subscribe(response => {
      this.postList = response;
    })
  }

  onsubmit(Values: any) {
    const newpost = new FormData();
    newpost.append('title', Values.title);
    newpost.append('description', Values.description)
    newpost.append('sharedtype', Values.sharedtype)
    newpost.append('file', this.selectedImage);
    this.postsService.createPost(newpost)
    .subscribe(response => {
      this.new_post = response;
      this.postList.splice(0, 0, this.new_post);
      this.create = false;
    })
  }

  public uploadImage(event) {
    // const ref_element =event.target;
    // const photo=ref_element.files[0];
    // const url_el=URL.createObjectURL(photo);
    // this.url=this.sanitizer.bypassSecurityTrustResourceUrl(url_el);
    // this.new_post.imageURL=this.url;
    if (event.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      // tslint:disable-next-line: no-shadowed-variable
      reader.onload = (event: any) => {
        this.new_post.imagePath = event.target.result;
      }
      this.selectedImage = event.target.files[0];
    }
  }

  onOpen() {
    this.create = true;
  }

  onClose() {
    this.create = false;
  }

  onDeletePost(data: {id: number}) {
    this.postList.splice(data.id, 1);
  }
}
