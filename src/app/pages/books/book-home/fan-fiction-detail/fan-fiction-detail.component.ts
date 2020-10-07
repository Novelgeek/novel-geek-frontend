import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FanFictionService } from 'app/core/_services/fan-fiction.service';

@Component({
  selector: 'app-fan-fiction-detail',
  templateUrl: './fan-fiction-detail.component.html',
  styleUrls: ['./fan-fiction-detail.component.scss']
})
export class FanFictionDetailComponent implements OnInit {

  id: any;
  fanFiction: any;
  review: any;
  constructor(private route: ActivatedRoute, private fanFictionService: FanFictionService,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });

    this.fanFictionService.getSpecific(this.id).subscribe(data => {
     this.fanFiction = data;
    })

  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'addReview'}).result.then((result) => {
    }, (reason) => {
    });
  }

  onAddReview() {
    console.log(this.review);
    this.fanFictionService.rateFanFiction(this.id, this.review).subscribe(data => {
      console.log(data);
    }, errorMsg => {
      console.log(errorMsg);
    })
  }

}
