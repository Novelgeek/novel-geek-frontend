import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Selling_modal from '../selling_modal';
import { SellingService } from 'app/core/_services/selling.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import {Router} from '@angular/router';
@Component({
  selector: 'app-more-info',
  templateUrl: './more-info.component.html',
  styleUrls: ['./more-info.component.scss']
})
export class MoreInfoComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router,
    private sellingService: SellingService,
    private toastr: ToastrService, 
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
  }

}
