import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AuctionService {

  constructor(private http: HttpClient) { }
  
  addAuction(auction: FormData){
    return this.http.post('/book/addauction', auction);
  }

  getAuctions(){
    return this.http.get('/book/getauctions');
  }
  
  addNewBid(bid){
    console.log(bid);
    return this.http.post('/book/addnewbid', bid);
  }
}
