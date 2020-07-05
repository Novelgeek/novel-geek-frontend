import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxSpinner } from 'ngx-spinner/lib/ngx-spinner.enum';
import { AuthService } from 'app/core/_services/auth.service';
import { AuctionService } from '../auction.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-auction-home',
  templateUrl: './auction-home.component.html',
  styleUrls: ['./auction-home.component.css']
})
export class AuctionHomeComponent implements OnInit {
  auctions:any = [1, 2, 3, 4, 5, 6];
  create = false;
  
  bookTitle:any='';
  bookDescription:any='';
  startingBid:any='';
  selectedFile:File;
  finishDate:any;



  constructor(private spinner:NgxSpinnerService,private authService:AuthService,
    private auctionService:AuctionService,private toastr:ToastrService) { }
  ngOnInit(): void {
  }

  onClick(){
    this.create=!this.create;
  }
  public uploadImage(event) {
    this.selectedFile = event.target.files[0]
  }
  onDate(){
    console.log(this.finishDate);
  }

  onSubmit() {
    this.spinner.show();
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('bookTitle', this.bookTitle);
    formData.append('bookDescription', this.bookDescription);
    formData.append('finishDate', this.finishDate);
    formData.append('userId', this.authService.currentUser.id);
    formData.append('startingBid', this.startingBid);

    this.auctionService.addAuction(formData).subscribe(data => {
      console.log(data);
      this.spinner.hide();
      this.toastr.success("New Auction Started Successfully!");
      this.create=false;
    }, error => {
        this.spinner.hide();
        this.toastr.error("Something went wrong!");
    });

  }

}
