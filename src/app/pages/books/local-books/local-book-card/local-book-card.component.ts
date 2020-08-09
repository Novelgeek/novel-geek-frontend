import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-local-book-card',
  templateUrl: './local-book-card.component.html',
  styleUrls: ['./local-book-card.component.scss']
})
export class LocalBookCardComponent implements OnInit {
  @Input() book: any;
  totalPrice = 1000;
  merchantId = 1215152;
  qty = 1
  price = 1000;
  currency = 'LKR';
  
  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  open(content) {
    this.modalService.open(content).result.then((result) => {
    }, (reason) => {
    });
  }

}
