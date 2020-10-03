import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }


  addAdmin(username: string, email: string, password: string) {
    return this.http.post('/admin/auth/signup',
      {
        username: username,
        email: email,
        password: password,
      }
    );
  }

  getAllAdmins() {
    return this.http.get('/admin/all');
  }

  getReports(){
    return this.http.get<any>('/admin/posts/getreports');
  }

  getreportedPost(postid: number){
    return this.http.get<any>('/admin/posts/getreportedpost/'+ postid);
  }

  getReportedData(postid : number){
    return this.http.get<any>('/admin/posts/getreporteddata/'+ postid);
  }

  deleteReportedPost(postid: number){
    return this.http.delete('/admin/posts/deletereportedpost/'+ postid)
  }

  cancelReport(postid: number){
    return this.http.delete('/admin/posts/cancelreport/'+ postid)
  }

}
