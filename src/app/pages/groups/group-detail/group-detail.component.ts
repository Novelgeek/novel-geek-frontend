import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupService } from 'app/core/_services/group.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { UserService } from 'app/core/_services/user.service';

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.scss']
})
export class GroupDetailComponent implements OnInit, OnDestroy {
  sub: any;
  id: any;
  group: any;
  users: any = [];
  currentPage = 'Posts'
  constructor(private route: ActivatedRoute, private groupService: GroupService,
              private modalService: NgbModal, private userService: UserService) { }

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

  open(content) {
    this.userService.getAllUsers().subscribe( data => {
      this.users = data;
      console.log(data);
    }, error => {
      console.log(error);
    });

    this.modalService.open(content, {ariaLabelledBy: 'add-members'}).result.then((result) => {
      }, (reason) => {
    });
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
  }

  inviteUser(userId: number){
    this.groupService.inviteUser(this.group.groupId, userId).subscribe( data => {
      console.log("user ivited");
      
    }, error => {
      console.log("unable to invite user");
      
    })
  }

}
