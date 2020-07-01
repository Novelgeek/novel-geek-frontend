import { Component, Output, EventEmitter, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { LayoutService } from '../services/layout.service';
import { ConfigService } from '../services/config.service';
import { AuthService } from 'app/core/_services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

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

  constructor(private layoutService: LayoutService, private configService: ConfigService, 
              private authService: AuthService, private router: Router) { }

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
    console.log(this.user);

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
