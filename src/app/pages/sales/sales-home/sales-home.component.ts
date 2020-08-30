import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import Selling_modal from '../selling_modal';
import { HttpClient } from '@angular/common/http';
import { SellingService } from 'app/core/_services/selling.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import {Router} from '@angular/router';
@Component({
  selector: 'app-sales-home',
  templateUrl: './sales-home.component.html',
  styleUrls: ['./sales-home.component.scss']
})
export class SalesHomeComponent implements OnInit {
  public myPosts: Selling_modal[];
  public allPosts: Selling_modal[];
  public new_post: Selling_modal;
  
  create=false;
  contact=false;

  imagePath:any;
  selectedImage: File;
  telephone:any='';

  constructor(private http: HttpClient, private sellingService: SellingService,
    private toastr: ToastrService, private spinner: NgxSpinnerService,
    private router: Router) {
    this.new_post = new Selling_modal();
    this.myPosts = [];
    this.allPosts = [];
  }
  ngOnInit() {
    this.spinner.show();
    this.sellingService.getAllPosts().subscribe(response => {
      this.allPosts = response;
      this.spinner.hide();
    }, error => {
      this.spinner.hide();
      this.toastr.error(error);
    })
    this.spinner.show();
    this.sellingService.getMyPosts().subscribe(response => {
      this.myPosts = response;
      this.spinner.hide();
    }, error => {
      this.spinner.hide();
      this.toastr.error(error);
    })
  }

  onsubmit(Values: any) {

    this.spinner.show();
    const newpost = new FormData();

    newpost.append('title', Values.title);
    newpost.append('description', Values.description)
    newpost.append('merchantid', Values.merchantid)
    newpost.append('price', Values.price)
    if(this.contact){
      newpost.append('telephone',Values.telephone)
    }else{
      newpost.append('telephone', "");
    }
    console.log(newpost);

    newpost.append('file', this.selectedImage);
    
    this.sellingService.createPost(newpost)
    .subscribe(response => {
      this.new_post = response;

      this.allPosts.splice(0, 0, this.new_post);
      this.myPosts.splice(0, 0, this.new_post);

      this.create = false;
      this.spinner.hide();
      this.toastr.success('Post created succesfully');

    }, errorMsg => {
      this.spinner.hide();
      this.toastr.error('Unable to create post at the moment.');
    })

    this.contact = false;
    this.imagePath = '';
  }

  public uploadImage(event) {
    if (event.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.imagePath = event.target.result;
      }
      this.selectedImage = event.target.files[0];
    }
  }

  enableContact(){
    this.contact = true;
    this.telephone = '';
  }
  showMessage(){
    this.contact =false;
    this.telephone ='0000000000';
  }

  onOpen() {
    this.create = true;
  }

  onClose() {
    this.create = false;
    this.imagePath = '';
    this.contact = false;
  }

  onDeletePostAll(data: {id: number}) {
    this.allPosts.splice(data.id,1);
   location.reload();
  }

  onDeletePostMy(data: {id: number}) {
    this.myPosts.splice(data.id, 1);
    location.reload();
  }
}
