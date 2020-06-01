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
     this.requests = this.members.filter( member => {
      return member.memberStatus === 'REQUESTED'
     });
     this.members = this.members.filter( function(member) {
       if (member.memberStatus !== 'REQUESTED' && member.memberStatus !== 'INVITED') {
         return true;
       }
     })

     this.groupService.getRole(this.id).subscribe(data => {
       const me: any = data;
      if (me.memberStatus === 'MEMBER' || me.memberStatus === 'ADMIN' || me.memberStatus === 'CREATOR'){
        this.isMember = true;
        if(me.memberStatus === 'ADMIN' || me.memberStatus === 'CREATOR') {
          this.isAdmin = false;
        } else {
          this.isAdmin = false;
        }
      }
      else {
        this.isMember = false;
        this.isAdmin =false;
      }
      console.log(this.isMember)
      console.log(this.isAdmin)
     }, error => {

     })
     this.groupName = this.group.groupName;
     this.description = this.group.description;
     this.avatar = this.group.groupAvatar;
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

    this.modalService.open(content, {ariaLabelledBy: 'add-members', scrollable: true}).result.then((result) => {
      }, (reason) => {
    });
  }

  onSubmit(form: NgForm) {
    console.log(form.value);

    this.groupService.updateGroup(this.groupName, this.description, this.avatar, this.id).subscribe( data => {
      console.log(data);
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

  acceptRequest(userId) {
    this.groupService.acceptRequest(this.id, userId).subscribe( data => {
      console.log(data);
    }, error => {
      console.log(error);
    })
  }

  leaveGroup() {
    this.groupService.leaveGroup(this.id).subscribe( data => {
      console.log('left group');

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
