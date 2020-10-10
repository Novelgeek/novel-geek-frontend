import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Post_modal from 'app/pages/posts/post_modal';
import { Comment_modal } from 'app/pages/posts/comment_modal';

@Injectable({providedIn: 'root'})
export class PostsService {

    constructor(private http: HttpClient) {}

    createPost(newpost: FormData) {
        return this.http.post<Post_modal>('/post/newpost', newpost)
    }

    getAllPosts() {
        return this.http.get<any>('/post/allposts')
    }

    getMyPosts() {
        return this.http.get<any>('/post/myposts')
    }

    likePost(postid: number) {
        return this.http.get<any>('/post/likepost/' + postid)
    }

    unLikePost(postid: number) {
        return this.http.delete('/post/unlikepost/' + postid)

    }

    getLikes(postid: number) {
        return this.http.get<any>('/post/likes/' + postid)
    }

    addComment(comment: string, postid: number) {
        return this.http.post<Comment_modal>('/post/addcomment/' + postid, {
            comment: comment
        })
    }

    getComments(postid: number) {
        return this.http.get<any>('/post/getcomments/' + postid)
    }

    deleteComment(commentid: number) {
        return this.http.delete('/post/deletecomment/' + commentid)
    }

    addReply(comment: string, commentid: number) {
        return this.http.post<any>('/post/addreply/' + commentid, {
            comment: comment
        })
    }

    getReplies(commentid: number) {
        return this.http.get<any>('/post/getreplies/' + commentid)
    }

    deleteReply(replyid: number) {
        return this.http.delete('/post/deletereply/' + replyid)
    }

    deletePost(postid: number) {
        return this.http.delete('/post/delete/' + postid)

    }

    reportPost(postid: number, reason: string) {
        return this.http.post<any>('/post/report/' + postid, reason)
    }

    unReportPost(postid: number) {
        return this.http.delete<any>('/post/unreport/' + postid)
    }

    getUserPost(email: string) {
        return this.http.get<any>('/post/userpost/' + email)
    }
}
