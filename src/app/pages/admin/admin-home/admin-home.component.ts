import { Component, OnInit } from '@angular/core';
import { StatisticService } from 'app/core/_services/statistic.service';
import { Statistics } from 'app/core/_models/statistics.model';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {
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
