import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }


  addAdmin(username: string, email: string, password: string) {
    return this.http.post('http://localhost:8080/admin/auth/signup',
      {
        username: username,
        email: email,
        password: password,
      }
    );
  }

  getAllAdmins() {
    return this.http.get('http://localhost:8080/admin/all');
  }

  getReports(){
    return this.http.get<any>('http://localhost:8080/admin/posts/getreports');
  }

  getreportedPost(postid: number){
    return this.http.get<any>('http://localhost:8080/admin/posts/getreportedpost/'+ postid);
  }

  getReportedData(postid : number){
    return this.http.get<any>('http://localhost:8080/admin/posts/getreporteddata/'+ postid);
  }

  deleteReportedPost(postid: number){
    return this.http.delete('http://localhost:8080/admin/posts/deletereportedpost/'+ postid)
  }

  cancelReport(postid: number){
    return this.http.delete('http://localhost:8080/admin/posts/cancelreport/'+ postid)
  }

}
