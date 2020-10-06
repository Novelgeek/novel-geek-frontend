import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FanFictionService {
  constructor(private http: HttpClient) { }




  // public addFanFiction(image: File) {
  //   const formData = new FormData();

  //   formData.append('image', image);

  //   return this.http.post('http://localhost:8080/fanfiction/add', formData);
  // }

  public addFanFiction(data: any) {
   

    return this.http.post('/fan-fiction/add', data);
  }


  getFanFictionsByUserid() {
    return this.http.get<any>('/fan-fiction/get-fanfinctions-by-userid')
}
deleteFanFiction(id) {
  return this.http.delete('/fan-fiction/delete/' + id);
}

getAll() {
  return this.http.get('/fanfiction/get-all')
}

}
