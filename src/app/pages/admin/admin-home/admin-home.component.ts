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

  public lineChartData = chartsData.lineChartData;
  public lineChartLabels = chartsData.lineChartLabels;
  public lineChartOptions = chartsData.lineChartOptions;
  public lineChartColors = chartsData.lineChartColors;
  public lineChartLegend = chartsData.lineChartLegend;
  public lineChartType = chartsData.lineChartType;



  // barChart
  public barChartOptions = chartsData.barChartOptions;
  public barChartLabels = chartsData.barChartLabels;
  public barChartType = chartsData.barChartType;
  public barChartLegend = chartsData.barChartLegend;
  public barChartData = chartsData.barChartData;
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
    this.statService.getBasicStat().subscribe(data => {
      this.statData = data;
      console.log(this.statData);
    })
  }

}
