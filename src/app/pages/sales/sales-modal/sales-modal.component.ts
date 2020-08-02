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
  // return: string;
  // cancel: string;
  // notify: string;
  // order: string;
   //title: string;
  // merchant: string;
  // country: string;
  // price: string;
  // currency:string;
  pay=false;
  constructor(private http: HttpClient, private sellingService: SellingService,
    private toastr: ToastrService, private spinner: NgxSpinnerService) { }

  ngOnInit() {

    // this.return="http://localhost:4200/posts";
    // this.cancel="http://localhost:4200/profile";
    // this.notify="http://localhost:8080/selling/newpayment";
    // this.order=this.item.sellingid.toString();
     //this.title=this.item.title;
    // this.merchant=this.item.merchantid;
    // this.price=this.item.price.toString();
    // this.country="Sri Lanka";
    // this.currency="LKR";
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

  public onSubmit(Values:any){
    console.log(Values);
    //myTest()
    // this.pay=false
    // this.new_payment = new Payment_modal();
    // this.new_payment.merchant_id = this.item.merchantid;
    // this.new_payment.return_url="http://localhost:4200/posts"
    // this.new_payment.cancel_url="http://localhost:4200/profile"
    // this.new_payment.notify_url="http://localhost:8080/selling/newpayment"
    // this.new_payment.order_id=this.item.sellingid.toString();
    // this.new_payment.currency="LKR"
    // this.new_payment.items=this.item.title
    // this.new_payment.amount=this.item.price.toString()
    // this.new_payment.first_name=Values.first_name
    // this.new_payment.last_name=Values.last_name
    // this.new_payment.email=Values.email
    // this.new_payment.phone=Values.phone
    // this.new_payment.address=Values.address
    // this.new_payment.city=Values.city
    // this.new_payment.country="Sri Lanka"
    // console.log(this.new_payment);

    // //this.http.post<any>('https://sandbox.payhere.lk/pay/checkout', this.new_payment)

    // this.spinner.show();
    // this.sellingService.storeCustomer({
    //   first_name : Values.first_name,
    //   last_name : Values.last_name,
    //   email: Values.email,
    //   phone : Values.phone,
    //   address : Values.address,
    //   city : Values.city,
    //   country: "Sri Lanka"
    // }).subscribe(response => {
    //   this.spinner.hide();
    //   console.log("in method")
    //   console.log(response);
    // }, error => {
    //   this.spinner.hide();
    //   this.toastr.error(error);
    // })
  }
}
