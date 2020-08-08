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
  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'create-group'}).result.then((result) => {
    }, (reason) => {
    });
  }

}
