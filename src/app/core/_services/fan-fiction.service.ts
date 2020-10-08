import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FanFictionService {


  constructor(private http: HttpClient) {}

  // public addFanFiction(image: File) {
  //   const formData = new FormData();

  //   formData.append('image', image);

  //   return this.http.post('http://localhost:8080/fanfiction/add', formData);
  // }

  public addFanFiction(data: any) {
    return this.http.post('/fan-fiction/add', data);
  }

  editFanFiction(data: any) {
    return this.http.post('/fan-fiction/edit', data);
  }

  getFanFictionsByUserid() {
    return this.http.get<any>('/fan-fiction/get-fanfinctions-by-userid');
  }

  deleteFanFiction(id) {
    return this.http.delete('/fan-fiction/delete/' + id);
  }

  getAll() {
    return this.http.get<any>('/fan-fiction/get-all');
  }

  getSpecific(id) {
    return this.http.get<any>('/fan-fiction/' + id);
  }

  rateFanFiction(id: any, review: any) {
    return this.http.post('/fan-fiction/add-review', {reviewDescription: review, bookId: id});
  }

  getFanFictionReviews(id){
    return this.http.get('/fan-fiction/review/' + id);
  }

}
