import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Post_modal from 'app/pages/posts/post_modal';

@Injectable({providedIn: 'root'})
export class PostsService {

    constructor(private http:HttpClient){}

    createPost(title:string, description:string, sharedtype:string){
        return this.http.post<Post_modal>("http://localhost:8080/post/newpost",{
            title: title,
            description: description,
            sharedtype: sharedtype
        })
    }

    getAllPosts(){
        return this.http.get<any>("http://localhost:8080/post/allposts")
    }

    getMyPosts(){
        return this.http.get<any>("http://localhost:8080/post/myposts")
    }

    likePost(postid:number){
        return this.http.get<any>("http://localhost:8080/post/likepost/"+ postid)
    }

    unLikePost(postid:number){
        return this.http.delete("http://localhost:8080/post/unlikepost/"+ postid)

    }

    deletePost(postid:number){
        return this.http.delete("http://localhost:8080/post/delete/"+ postid)
        
    }
}
