import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseChartDirective, Color, Label } from 'ng2-charts';
import { ChartOptions, ChartDataSets } from 'chart.js';
import { AdminService } from 'app/core/_services/admin.service';
import  Report_modal  from '../report_modal';
import Report_post_modal from '../report_post_modal';
import Report_data_modal from '../report_data_modal';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-manage-posts',
  templateUrl: './manage-posts.component.html',
  styleUrls: ['./manage-posts.component.scss']
})
export class ManagePostsComponent implements OnInit {
  reportList: Report_modal [];
  post : Report_post_modal;
  reportDataList : Report_data_modal [];
  showpost : boolean = false;
  showreports : boolean = false;
  constructor(private adminService: AdminService,
    private toastr: ToastrService, private spinner: NgxSpinnerService) {

    this.reportList = [];
    this.post = new Report_post_modal();
    this.reportDataList = [];
    this.showpost = false;
    this.showreports = false;
  }

  ngOnInit(): void {
    this.spinner.show();
    this.adminService.getReports().subscribe(response => {
      this.reportList = response;
      this.spinner.hide();
    }, errorMsg => {
      this.spinner.hide()
    })
  }

  closePost(){
    this.showpost=false;
  }

  closeReport(){
    this.showreports = false;
  }

  getreportedPost(postid:number){
    this.showpost = true;
    this.spinner.show();
    this.adminService.getreportedPost(postid).subscribe(response => {
      this.post = response;
      this.spinner.hide();
    }, errorMsg => {
      this.spinner.hide()
    })
  }

  getReportedData(postid:number){
    this.showreports = true;
    this.spinner.show();
    this.adminService.getReportedData(postid).subscribe(response => {
      this.reportDataList = response;
      this.spinner.hide();
    }, errorMsg => {
      this.spinner.hide()
    })
  }

  deleteReportedPost(postid: number, i: number){
    if(confirm("Are you sure to delete this post?")) {
        this.spinner.show();
      this.adminService.deleteReportedPost(postid).subscribe(response => {
        this.reportList.splice(i,1);
        this.spinner.hide();
      }, errorMsg => {
        this.spinner.hide()
      })
    }else{
      return;
    }
    
  }

  cancelReport(postid: number, i: number){
    if(confirm("Are you sure to cancel this report?")){
        this.spinner.show();
      this.adminService.cancelReport(postid).subscribe(response => {
        this.reportList.splice(i,1);
        this.spinner.hide();
      }, errorMsg => {
        this.spinner.hide()
      })
    }else{
      return;
    }
    
  }
}
