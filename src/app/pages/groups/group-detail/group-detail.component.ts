import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupService } from 'app/core/_services/group.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { UserService } from 'app/core/_services/user.service';
import { AuthService } from 'app/core/_services/auth.service';

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
  requests: any = [];
  members: any = [];
  currentPage = 'Posts'
  groupName: string;
  description: string;
  avatar: string;

  isMember: boolean;
  isAdmin: boolean;
  userId: number;

  constructor(private route: ActivatedRoute, private groupService: GroupService,
              private modalService: NgbModal, private userService: UserService,
              private authService: AuthService) { }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit() {
    this.userId = +this.authService.currentUser.id;
    console.log(this.userId);
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
   });

   this.groupService.getSingleGroup(this.id).subscribe(data => {
    this.group = data;
    this.members = this.group.members;

    this.isMember = this.group.member;
    this.isAdmin = this.group.isAdmin;
    this.groupName = this.group.groupName;
    this.description = this.group.description;
    this.avatar = this.group.groupAvatar;
   }, error => {
     console.log('cant find group')
   })

   this.groupService.getRequests(this.id).subscribe( data => {
     this.requests = data
   }, error => {
     console.log(error);
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

    this.modalService.open(content, {ariaLabelledBy: 'add-members', scrollable: true}).result.then((result) => {
      }, (reason) => {
    });
  }

  onSubmit(form: NgForm) {
    console.log(form.value);

    this.groupService.updateGroup(this.groupName, this.description, this.avatar, this.id).subscribe( data => {
      this.groupName = data.groupName;
      this.description = data.description;
      this.avatar = data.groupAvatar;
      console.log(data.groupName);
    }, error => {
      console.log(error);
    })
  }

  inviteUser(userId: number) {
    this.groupService.inviteUser(this.group.groupId, userId).subscribe( data => {
      console.log('user ivited');
      this.modalService.dismissAll();
    }, error => {
      console.log('unable to invite user');

    })
  }

  acceptRequest(requestId) {
    this.groupService.acceptRequest(requestId).subscribe( data => {
      console.log(data);
      this.requests = this.requests.filter(request => {
        return request.notificationId !== requestId
      })
    }, error => {
      console.log(error);
    })
  }

  leaveGroup() {
    this.groupService.leaveGroup(this.id).subscribe( data => {
      this.isMember = false;
      this.isAdmin = false;
    }, error => {
      console.log(error);

    })
  }

  removeUser(userId) {
    this.groupService.removeUser(this.id, userId).subscribe((data) => {
      this.members = this.members.filter(function(member)  {
        return (member.users.id !== userId);
      })
    }, error => {
      console.log(error);

    })
  }

  joinGroup() {
    this.groupService.requestMembership(this.id).subscribe( data=> {
      console.log(data);
    }, error => {
      console.log(error);
    })
  }

}
