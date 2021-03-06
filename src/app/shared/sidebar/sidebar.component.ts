import { Component, OnInit, ViewChild, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { customAnimations } from '../animations/custom-animations';
import { ConfigService } from '../services/config.service';
import { ROUTES } from './sidebar-routes.config';
import { ADMIN_ROUTES } from './sidebar-admin-routes.config';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: customAnimations
})
export class SidebarComponent implements OnInit, AfterViewInit {

  @ViewChild('toggleIcon', {static: false} ) toggleIcon: ElementRef;

  public menuItems: any[];
  depth: number;
  activeTitle: string;
  activeTitles: string[] = [];
  expanded: boolean;
  nav_collapsed_open = false;
  logoUrl = 'assets/img/logo.png';
  isAdmin = false;
  public config: any = {};


  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private router: Router,
    private route: ActivatedRoute,
    private configService: ConfigService,
  ) {
    if (this.depth === undefined) {
      this.depth = 0;
      this.expanded = true;
    }


  }


  ngOnInit() {
    this.menuItems = ROUTES;

    this.config = this.configService.interfaceConf;
    if (this.config.layout.sidebar.backgroundColor === 'white') {
      this.logoUrl = 'assets/img/logo-dark.png';
    } else {
      this.logoUrl = 'assets/img/logo.png';
    }



    if(this.router.routerState.snapshot.url.search('admin') === 1) {
      this.isAdmin = true;
      this.menuItems = ADMIN_ROUTES;

    }
  }

  ngAfterViewInit() {
      setTimeout(() => {
        // tslint:disable-next-line: triple-equals
        if (this.config.layout.sidebar.collapsed != undefined) {
          if (this.config.layout.sidebar.collapsed === true) {
            this.expanded = false;
            this.renderer.addClass(this.toggleIcon.nativeElement, 'ft-toggle-left');
            this.renderer.removeClass(this.toggleIcon.nativeElement, 'ft-toggle-right');
            this.nav_collapsed_open = true;
          } else if (this.config.layout.sidebar.collapsed === false) {
            this.expanded = true;
            this.renderer.removeClass(this.toggleIcon.nativeElement, 'ft-toggle-left');
            this.renderer.addClass(this.toggleIcon.nativeElement, 'ft-toggle-right');
            this.nav_collapsed_open = false;
          }
        }
      }, 0);
  }

  toggleSlideInOut() {
    this.expanded = !this.expanded;
  }

  handleToggle(titles) {
    this.activeTitles = titles;
  }


}
