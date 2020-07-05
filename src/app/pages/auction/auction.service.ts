import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AuctionService {

  constructor(private http: HttpClient) { }
  addAuction(auction: FormData){
    return this.http.post('http://localhost:8080/book/addauction', auction);
  }
}
