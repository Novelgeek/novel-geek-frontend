import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Post_modal from 'app/pages/posts/post_modal';
import { Comment_modal } from 'app/pages/posts/comment_modal';

@Injectable({providedIn: 'root'})
export class PostsService {

    constructor(private http:HttpClient){}

    createPost(newpost:FormData){
        return this.http.post<Post_modal>("http://localhost:8080/post/newpost", newpost)
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

    getLikes(postid:number){
        return this.http.get<any>("http://localhost:8080/post/likes/" + postid)
    }

    addComment(comment:string, postid:number){
        return this.http.post<Comment_modal>("http://localhost:8080/post/addcomment/" + postid,{
            comment:comment
        })
    }

    getComments(postid:number){
        return this.http.get<any>("http://localhost:8080/post/getcomments/" + postid)
    }

    deletePost(postid:number){
        return this.http.delete("http://localhost:8080/post/delete/"+ postid)
        
    }

    reportPost(postid:number, reason: string){
        return this.http.post<any>("http://localhost:8080/post/report/"+ postid, reason)
    }

    unReportPost(postid:number){
        return this.http.delete<any>("http://localhost:8080/post/unreport/"+ postid)
    }
}
