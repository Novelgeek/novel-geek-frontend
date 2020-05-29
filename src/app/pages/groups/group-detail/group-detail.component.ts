import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupService } from 'app/core/_services/group.service';

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.scss']
})
export class GroupDetailComponent implements OnInit, OnDestroy {
  sub: any;
  id: any;
  group: any;
  currentPage = 'Posts'
  constructor(private route: ActivatedRoute, private groupService: GroupService) { }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      
   });

   this.groupService.getSingleGroup(this.id).subscribe(data => {
     this.group = data;
   }, error => {
     console.log('cant find group')
   })
  }

  showPage(page: string) {
    this.currentPage = page;
  }

}
