import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-group-horizontal-card',
  templateUrl: './group-horizontal-card.component.html',
  styleUrls: ['./group-horizontal-card.component.scss']
})
export class GroupHorizontalCardComponent implements OnInit {
  @Input() group;
  constructor() { }

  ngOnInit() {
    console.log(this.group);
    
  }

}
