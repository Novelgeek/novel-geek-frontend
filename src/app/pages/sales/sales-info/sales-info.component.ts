import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Selling_modal from '../selling_modal';
import { SellingService } from 'app/core/_services/selling.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import {NgForm} from '@angular/forms';
@Component({
  selector: 'app-sales-info',
  templateUrl: './sales-info.component.html',
  styleUrls: ['./sales-info.component.scss']
})
export class SalesInfoComponent implements OnInit {
  sub :any;
  myPost: Selling_modal;
  newImage: any;
  newImageFile: File;
  isImage: boolean=false;
  constructor(private route: ActivatedRoute,
    private sellingService: SellingService,
    private toastr: ToastrService, 
    private spinner: NgxSpinnerService) {

      this.myPost = new Selling_modal();
      this.isImage = false;
    }

  ngOnInit() {
    this.spinner.show();
    this.sub = this.route.params.subscribe(params => {
      this.sellingService.getPost(params['id']).subscribe(response => {
        console.log(response)
        this.myPost = response;
      },
      error => {
      this.spinner.hide();
      this.toastr.error(error);
    })
   });
  }

  onsubmit(Values : any){
    console.log(Values);
  }

  public uploadImage(event) {
    // const ref_element =event.target;
    // const photo=ref_element.files[0];
    // const url_el=URL.createObjectURL(photo);
    // this.url=this.sanitizer.bypassSecurityTrustResourceUrl(url_el);
    // this.new_post.imageURL=this.url;
    this.isImage = true;
    if (event.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.newImage = event.target.result;
      }
      this.newImageFile = event.target.files[0];
    }
  }

}
