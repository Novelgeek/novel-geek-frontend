import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-friend-card',
  templateUrl: './friend-card.component.html',
  styleUrls: ['./friend-card.component.scss']
})
export class FriendCardComponent implements OnInit {
  @Input() user: any;
  constructor() { }

  ngOnInit() {
    console.log(this.user);
    
  }

}
