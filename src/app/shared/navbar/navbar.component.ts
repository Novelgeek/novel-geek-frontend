import { Component, Output, EventEmitter, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { LayoutService } from '../services/layout.service';
import { ConfigService } from '../services/config.service';
import { AuthService } from 'app/core/_services/auth.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FriendService } from 'app/core/_services/friend.service';
import { NotificationService } from 'app/core/_services/notification.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, AfterViewInit, OnDestroy {
  toggleClass = 'ft-maximize';
  placement = 'bottom-right';
  public isCollapsed = true;
  @Output() toggleHideSidebar = new EventEmitter<Object>();
  private userSub: Subscription;
  public user: any;
  isAuthenticated = false;
  isAdmin = false;

  public config: any = {};

  groupNotifications: any = [];
  friendNotifications: any = [];
  reportNotifications: any = [];
  commentNotifications: any = [];
  replyNotifications: any = [];
  notificationCount: number;

  constructor(
    private layoutService: LayoutService,
    private configService: ConfigService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService
    ) { 
      this.notificationCount=0;
    }


  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  ngOnInit() {
    this.config = this.configService.interfaceConf;
    this.userSub = this.authService.user.subscribe( user => {
      this.isAuthenticated = !!user; // !user ? false : true
      this.user = user;
    });
    if (!this.isAuthenticated) {
      this.user = {username: 'not logged in'}
    }
    if (this.router.routerState.snapshot.url.search('admin') === 1) {
      this.isAdmin = true;
    }

    this.notificationService.groupNotifications.subscribe(data => {
      this.groupNotifications = data;
    })

    this.notificationService.friendNotifications.subscribe(data => {
      this.friendNotifications = data;
    })

    this.notificationService.reportNotifications.subscribe(data => {
      this.reportNotifications=data;
    })

    this.notificationService.commentNotifications.subscribe(data => {
      this.commentNotifications=data;
    })

    this.notificationService.replyNotifications.subscribe(data => {
      this.replyNotifications=data;
    })

    this.notificationCount=this.groupNotifications.length
    +this.friendNotifications.length
    +this.reportNotifications.length
    +this.commentNotifications.length
    +this.replyNotifications.length

  }

  ngAfterViewInit() {
    if (this.config.layout.dir) {
      const dir = this.config.layout.dir;
      if (dir === 'rtl') {
        this.placement = 'bottom-left';
      } else if (dir === 'ltr') {
        this.placement = 'bottom-right';
      }
    }
  }


  ToggleClass() {
    if (this.toggleClass === 'ft-maximize') {
      this.toggleClass = 'ft-minimize';
    } else {
      this.toggleClass = 'ft-maximize';
    }
  }

  toggleNotificationSidebar() {
    this.layoutService.emitChange(true);
  }

  toggleSidebar() {
    const appSidebar = document.getElementsByClassName('app-sidebar')[0];
    if (appSidebar.classList.contains('hide-sidebar')) {
      this.toggleHideSidebar.emit(false);
    } else {
      this.toggleHideSidebar.emit(true);
    }
  }

  onLogout() {
    this.authService.logout();
  }
}
