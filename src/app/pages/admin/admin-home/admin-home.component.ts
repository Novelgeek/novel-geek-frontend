import { Component, OnInit } from '@angular/core';
import { StatisticService } from 'app/core/_services/statistic.service';
import { Statistics } from 'app/core/_models/statistics.model';
import * as chartsData from '../admin-home/chartjs';
import { ChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss'],
})
export class AdminHomeComponent implements OnInit {
  public genreData: any=[];
  public userData:any=[];
  public lineChartData =  [
    { data: [330, 600, 260, 700], label: 'Users' },
  
  ];
  public lineChartLabels = ['January', 'February', 'March', 'April','May','June','July','August','September','October','November','December'];
  public lineChartOptions = chartsData.lineChartOptions;
  public lineChartColors = chartsData.lineChartColors;
  public lineChartLegend = chartsData.lineChartLegend;
  public lineChartType = chartsData.lineChartType;



  // barChart
  public barChartOptions = chartsData.barChartOptions;
  public barChartLabels = ['Jan','Feb'];
  public barChartData = [{ data: [330, 600], label: 'Account A' }];
  public barChartType = chartsData.barChartType;
  public barChartLegend = chartsData.barChartLegend;
  public barChartColors = chartsData.barChartColors;


  // events
  public chartClicked(e: any): void {
    //your code here
  }

  public chartHovered(e: any): void {
    //your code here
  }
  statData: any;
  statistics: Statistics;
  constructor(private statService: StatisticService) { }

  ngOnInit() {
    this.statService.getGenreStats().subscribe(data=>{
       console.log('data');
       console.log(data);
       this.genreData = data;
       let genreStatsData = [
         {data: this.genreData.count, label:"Search Count"}
       ]
       this.barChartData = genreStatsData;
       this.barChartLabels = this.genreData.categories;
    });
    this.statService.getUserStats().subscribe(dat=>{
      console.log(dat);
      this.userData=dat;
      this.lineChartData =  [{ data: this.userData, label: 'Users' }];
    });
    this.statService.getBasicStat().subscribe(data => {
      this.statData = data;
      console.log(this.statData);
    })
  }

}
