import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-local-book-card',
  templateUrl: './local-book-card.component.html',
  styleUrls: ['./local-book-card.component.scss']
})
export class LocalBookCardComponent implements OnInit {
  @Input() book: any;
  totalPrice = 0;
  merchantId = 1215152;
  qty = 30
  price = 7;
  currency = 'LKR';
  bookName = '';

  constructor(private modalService: NgbModal, private http: HttpClient) { }

  ngOnInit() {
    this.totalPrice = this.price * this.qty
    this.bookName = this.book.title;
  }

  open(content) {
    this.modalService.open(content).result.then((result) => {
    }, (reason) => {
    });
  }

  onClick() {
    this.http.post('https://sandbox.payhere.lk/pay/checkout', {

    })
    console.log('aa')
    this.http.request('POST', 'https://sandbox.payhere.lk/pay/checkout')
  }

  updatePrice() {
    this.totalPrice = this.price * this.qty
  }

}
