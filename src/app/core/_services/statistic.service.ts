import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class StatisticService {
  constructor(private http: HttpClient) {}

  getBasicStat() {
    return this.http.get('/admin/basic-stat');
  }
  getGenreStats(){
    return this.http.get('http://localhost:8080/admin/genrestats')
  }
  getUserStats(){
    return this.http.get('http://localhost:8080/admin/userstats')
  }
}
