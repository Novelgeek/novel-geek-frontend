import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {IBooks} from './booklet/books'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BooksService {

  public apiKey = 'AIzaSyBXGwa67D5ZrrFuPP6YUNc9glwM8edWFck';
  public name = '';
  public bookId = '';

  constructor(private http: HttpClient) { }

  getBooks(searchTerm){
    this.name = searchTerm;
    return this.http.get('https://www.googleapis.com/books/v1/volumes?q='+encodeURIComponent(this.name)+'+intitle&maxResults=10&printType=books&key='+this.apiKey);
    // return this.http.get('https://www.googleapis.com/books/v1/volumes/oPIMmQEACAAJ?key=AIzaSyBXGwa67D5ZrrFuPP6YUNc9glwM8edWFck');
  }
  getBooksById(bookId){
    this.bookId = bookId;
    return this.http.get('https://www.googleapis.com/books/v1/volumes/'+this.bookId+'?key=AIzaSyBXGwa67D5ZrrFuPP6YUNc9glwM8edWFck');
  }
}
