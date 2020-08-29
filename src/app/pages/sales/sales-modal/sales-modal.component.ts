import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import Selling_modal from '../selling_modal';
import Payment_modal from '../payment_modal';
import { HttpClient } from '@angular/common/http';
import { SellingService } from 'app/core/_services/selling.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
//declare const myTest: any;
@Component({
  selector: 'app-sales-modal',
  templateUrl: './sales-modal.component.html',
  styleUrls: ['./sales-modal.component.scss']
})
export class SalesModalComponent implements OnInit {
  @Output() ondelete  = new EventEmitter <{id: number}> ();
  @Input() item: Selling_modal;
  @Input() itemindex: number;
  public new_payment: Payment_modal;
  return: string;
  cancel: string;
  notify: string;
  country: string;
  currency:string;

  firstname:string;
  lastname:string;
  Phone:string;
  Address:string;
  City:string;
  Email:string;

  pay=false;
  constructor(private http: HttpClient, private sellingService: SellingService,
    private toastr: ToastrService, private spinner: NgxSpinnerService) {
      this.firstname="";
      this.lastname="";
      this.Phone="";
      this.Address="";
      this.City="";
      this.Email="";
     }

  ngOnInit() {

    this.return="http://localhost:4200/sales";
    this.cancel="http://localhost:4200/sales";
    this.notify="http://localhost:8080/selling/newpayment";
    this.country="Sri Lanka";
    this.currency="LKR";
  }

  public deletePost(postid: number) {
    // this.postService.deletePost(postid).
    // subscribe(response => {
    //   this.isShow = false;
    //   this.ondelete.emit({id: this.itemindex});
    // })

    console.log(postid);
  }


  public openPayment(){
    this.pay = true;
  }

  public onClose() {
    this.pay = false;
  }

  bindData(Values: any){
    //console.log(Values);
    this.firstname=Values.first_name;
    this.lastname=Values.last_name;
    this.Phone=Values.phone
    this.Address=Values.addres;
    this.City=Values.city;
    this.Email=Values.email;
  }
  
}
