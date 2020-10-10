import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Selling_modal from '../selling_modal';
import { SellingService } from 'app/core/_services/selling.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import {Router} from '@angular/router';
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
    private router: Router,
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
        this.spinner.hide();
      },
      error => {
      this.spinner.hide();
      this.toastr.error(error);
    })
   });
  }

  onsubmit(Values: any) {

    this.spinner.show();
    const newpost = new FormData();

    if(Values.Title==""){
      newpost.append('title', this.myPost.title);
    }else{
      newpost.append('title', Values.Title);
    }

    if(Values.Description==""){
      newpost.append('description', this.myPost.description);
    }else{
      newpost.append('description', Values.Description);
    }

    if(Values.Merchantid==""){
      newpost.append('merchantid', this.myPost.merchantid);
    }else{
      newpost.append('merchantid', Values.Merchantid);
    }

    if(Values.Telephone==""){
      newpost.append('telephone', this.myPost.telephone);
    }else{
      newpost.append('telephone', Values.Telephone);
    }

    if(Values.Price==""){
      newpost.append('price', this.myPost.price.toString())
    }else{
      newpost.append('price', Values.Price);
    }

    if(Values.Image==""){
      newpost.append('filepath', this.myPost.imagePath);
      newpost.append('file', this.newImageFile);
    }else{
      newpost.append('filepath', "");
      newpost.append('file', this.newImageFile);
    }
    newpost.append('sellingid', this.myPost.sellingid.toString());
    console.log(newpost);
    
    this.sellingService.editPost(newpost)
    .subscribe(response => {
      this.spinner.hide();
      console.log(response);
      this.toastr.success('Updated Successfully');
      this.router.navigate(['/sales']);

    }, errorMsg => {
      this.spinner.hide();
      this.toastr.error('Unable to update at the moment.');
      this.router.navigate(['/sales']);
    })
    
  }

  public uploadImage(event) {
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
