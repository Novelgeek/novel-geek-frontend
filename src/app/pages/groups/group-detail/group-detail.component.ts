import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupService } from 'app/core/_services/group.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { UserService } from 'app/core/_services/user.service';
import { AuthService } from 'app/core/_services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

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

  nonMembers: any = [];
  allMembers: any = [];

  isMember: boolean;
  isAdmin: boolean;
  userId: number;

  currentOrientation = 'horizontal';
  selectedFile: any;
  posts: any;


  constructor(private route: ActivatedRoute, private groupService: GroupService,
              private modalService: NgbModal, private userService: UserService,
              private authService: AuthService, private router: Router,
              private toastr: ToastrService, private spinner: NgxSpinnerService,) { }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit() {
    this.spinner.show();
    this.userId = +this.authService.currentUser.id;
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
    this.posts = this.group.posts;
    this.spinner.hide();
   }, error => {
     // tslint:disable-next-line: no-unused-expression
     this.router.navigate(['404']);
   })
   this.spinner.show();
   this.groupService.getRequests(this.id).subscribe( data => {
     this.requests = data
     this.spinner.hide();
   }, error => {
    this.spinner.hide();
    this.toastr.error('Unable to get member Requests')
   })

   this.groupService.getMembersAndNonMenbers(this.id).subscribe(data => {
     this.allMembers = data;
     this.nonMembers = this.allMembers.filter(user => {
      return !user.member
    })

   })

  }

  showPage(page: string) {
    this.currentPage = page;
  }

  open(content) {
    this.userService.getAllUsers().subscribe( data => {
      this.users = data;
    }, error => {
      console.log(error);
    });

    this.modalService.open(content, {ariaLabelledBy: 'add-members', scrollable: true}).result.then((result) => {
      }, (reason) => {
    });
  }

  onSubmit(form: NgForm) {
    this.spinner.show();

    this.groupService.updateGroup(this.groupName, this.description, this.avatar, this.id).subscribe( data => {
      this.groupName = data.groupName;
      this.description = data.description;
      this.spinner.hide();
      this.toastr.success('Group updated succesfully');
    }, error => {
      this.toastr.error(error);
    })
  }

  inviteUser(userId) {
    this.spinner.show();
    this.groupService.inviteUser(this.group.groupId, userId).subscribe( data => {
      this.spinner.hide();
      this.toastr.success('User ivited successfully');
      this.modalService.dismissAll();
    }, error => {
      this.spinner.hide();
      this.toastr.error('Unable to invite user');

    })
  }

  acceptRequest(requestId) {
    this.spinner.show();
    this.groupService.acceptRequest(requestId).subscribe( data => {
      this.spinner.hide();
      this.requests = this.requests.filter(request => {
        return request.notificationId !== requestId
      })
      this.toastr.success('Request accepted');
    }, error => {
      this.spinner.hide();
      this.toastr.error(error);
    })
  }


  leaveGroup() {
    this.spinner.show();
    this.groupService.leaveGroup(this.id).subscribe( data => {
      this.isMember = false;
      this.isAdmin = false;
      this.spinner.hide();
      this.toastr.info('Left Group');
    }, error => {
      this.spinner.hide();
      this.toastr.error(error);

    })
  }

  removeUser(userId) {
    this.spinner.show();
    this.groupService.removeUser(this.id, userId).subscribe((data) => {
      this.members = this.members.filter(function(member)  {
        return (member.users.id !== userId);
      })
      this.spinner.hide();
      this.toastr.info('Removed User');
    }, error => {
      this.spinner.hide();
      this.toastr.error(error);
    })
  }

  joinGroup() {
    this.spinner.show();
    this.groupService.requestMembership(this.id).subscribe( data=> {
      this.spinner.hide();
      this.toastr.info('You have requested to join the group');
    }, error => {
      this.spinner.hide();
      this.toastr.info('Unable to process request');
    })
  }

  deleteGroup() {
    this.toastr.warning()
    this.groupService.deleteGroup(this.id).subscribe(data => {
      console.log('Group deleted');
    }, error => {
      console.log(error)
    })
  }

  // photo upload

  onFileChanged(event) {
    this.selectedFile = event.target.files[0]
  }

  onPostSubmit(form: NgForm) {

    const newpost = new FormData();
    newpost.append('title', form.value.title);
    newpost.append('description', form.value.description)
    newpost.append('sharedtype', 'Group')
    newpost.append('file', this.selectedFile);

    this.spinner.show();

    this.groupService.createPost(newpost, this.id).subscribe( data => {
      console.log(data)
      this.spinner.hide();
      this.toastr.success('New Post Added');
    }, error => {
      this.toastr.error(error);
    })
  }

}
