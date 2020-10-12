import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AuctionService {
  aid = '';

  constructor(private http: HttpClient) { }
  
  addAuction(auction: FormData){
    return this.http.post('http://localhost:8080/auction/addauction', auction);
  }

  getAuctions(){
    return this.http.get('http://localhost:8080/auction/getauctions');
  }
  
  addNewBid(bid){
    console.log(bid);
    return this.http.post('http://localhost:8080/auction/addnewbid', bid);
  }
  
  getAuctionData(aid) {
    this.aid = aid;
    return this.http.get('http://localhost:8080/auction/getauctiondata/' + this.aid);
  }

  makeSale(sale: { auctionId: any; bidderId: any }) {
    return this.http.post('http://localhost:8080/auction/makesale', sale);
  }
  endAuction(aid) {
    this.aid=aid;
    return this.http.delete('http://localhost:8080/auction/endauction/' + this.aid);
  }
}
