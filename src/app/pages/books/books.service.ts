import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {IBooks} from './booklet/books'
import { Observable } from 'rxjs';
import { Book } from 'app/core/_models/book.model';
@Injectable({
  providedIn: 'root'
})
export class BooksService {


  public apiKey = 'AIzaSyBXGwa67D5ZrrFuPP6YUNc9glwM8edWFck';
  public name = '';
  public bookId = '';

  constructor(private http: HttpClient) { }

  getBooks(searchTerm) {
    this.name = searchTerm;
    return this.http.get('https://www.googleapis.com/books/v1/volumes?q=' + encodeURIComponent(this.name) + '+intitle&maxResults=12&printType=books&key=' + this.apiKey);
    // return this.http.get('https://www.googleapis.com/books/v1/volumes/oPIMmQEACAAJ?key=AIzaSyBXGwa67D5ZrrFuPP6YUNc9glwM8edWFck');
  }

  getBooksById(bookId) {
    this.bookId = bookId;
    console.log('book id'+ this.bookId);
    return this.http.get('https://www.googleapis.com/books/v1/volumes/' + this.bookId + '?key=AIzaSyBXGwa67D5ZrrFuPP6YUNc9glwM8edWFck');
  }

  getReviews(bookId) {
    this.bookId = bookId;
    return this.http.get('/book/getreviews/' + this.bookId);
  }
  addComment(comment) {
    return this.http.post('/book/addcomment', comment);
  }

  rateBook(bookDetail: Book) {
    return this.http.post('/book/addRating', bookDetail);
  }

  getRecommendations() {
    return this.http.get('/book/getRecommendations');
  }

  getRecentlyViewed() {
    return this.http.get('/book/recentlyViewed');
  }

  updateRecentlyViewed(bookDetail: Book) {
    return this.http.post('/book/updateView', bookDetail);
  }

  getUserRating(bookId) {
    return this.http.get('/book/userRating/' + bookId);
  }

  getMyBookRatings(){
    return this.http.get('/book/bookRatings');
  }

  addReview(myReview: String, bookId: any) {
    return this.http.post('/book/addreview', {
      bookId: bookId,
      reviewDescription: myReview
    });
  }

  addNewBook(newBook: FormData) {
    return this.http.post('/book/addNewBook', newBook);
  }

  getAllLocalBooks() {
    return this.http.get('/book/allLocal')
  }

}
