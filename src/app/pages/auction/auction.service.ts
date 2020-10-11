import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AuctionService {
  aid = '';

  constructor(private http: HttpClient) { }
  
  addAuction(auction: FormData){

    return this.http.post('/auction/addauction', auction);
  }



  getAuctions(){
    return this.http.get('/book/getauctions');

  }
  
  addNewBid(bid){
    console.log(bid);

    return this.http.post('/auction/addnewbid', bid);
  }
  
  getAuctionData(aid) {
    this.aid = aid;
    return this.http.get('/auction/getauctiondata/' + this.aid);
  }

  makeSale(sale: { auctionId: any; bidderId: any }) {
    return this.http.post('/auction/makesale', sale);

  }
  endAuction(aid) {
    return this.http.delete('http://localhost:8080/auction/endauction/' + this.aid);
  }
}
