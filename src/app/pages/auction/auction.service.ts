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

  getAuctions(){
    return this.http.get('http://localhost:8080/book/getauctions');
  }
  
  addNewBid(bid){
    console.log(bid);
    return this.http.post('http://localhost:8080/book/addnewbid', bid);
  }
}
