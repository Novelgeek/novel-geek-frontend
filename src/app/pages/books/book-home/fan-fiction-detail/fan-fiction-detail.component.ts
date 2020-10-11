import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FanFictionService } from 'app/core/_services/fan-fiction.service';
import { NgForm } from '@angular/forms';
import { NgxSpinner } from 'ngx-spinner/lib/ngx-spinner.enum';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-fan-fiction-detail',
  templateUrl: './fan-fiction-detail.component.html',
  styleUrls: ['./fan-fiction-detail.component.scss']
})
export class FanFictionDetailComponent implements OnInit {

  id: any;
  fanFiction: any;
  review = '';
  reviews: any = [];

  constructor(private route: ActivatedRoute, private fanFictionService: FanFictionService,
    private modalService: NgbModal, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });

    this.fanFictionService.getSpecific(this.id).subscribe(data => {
     this.fanFiction = data;
    })

    this.fanFictionService.getFanFictionReviews(this.id).subscribe(data => {
      console.log(data);
      this.reviews = data;
    })

  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'addReview'}).result.then((result) => {
    }, (reason) => {
    });
  }

  onAddReview() {
    console.log(this.review);
    this.spinner.show()
    this.fanFictionService.rateFanFiction(this.id, this.review).subscribe(data => {
      this.spinner.hide()
      console.log(data);
      this.reviews.push(data)
      this.modalService.dismissAll()
    }, errorMsg => {
      this.spinner.hide()
      console.log(errorMsg);
      this.modalService.dismissAll()
    })
  }

}
