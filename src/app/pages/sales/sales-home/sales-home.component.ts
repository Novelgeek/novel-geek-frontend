import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-sales-home',
  templateUrl: './sales-home.component.html',
  styleUrls: ['./sales-home.component.scss']
})
export class SalesHomeComponent implements OnInit {
  create=false;
  contact=false;
  imagePath:any;
  selectedImage: File;

  telephone:any='';

  constructor() {
   }
  ngOnInit() {

  }

  onsubmit(Values: any) {
    console.log(Values);
    this.create = false;
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
}
