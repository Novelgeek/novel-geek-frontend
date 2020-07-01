import { Component, ViewChild, ElementRef, Inject, Renderer2, OnInit, OnDestroy } from '@angular/core';
import { ConfigService } from 'app/shared/services/config.service';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styles: []
})
export class HomeLayoutComponent implements OnInit{
    @ViewChild('sidebarBgImage', {static: false}) sidebarBgImage: ElementRef;
    @ViewChild('appSidebar', {static: false}) appSidebar: ElementRef;
    @ViewChild('wrapper', {static: false}) wrapper: ElementRef;

    options = {
        direction: 'ltr',
        bgColor: 'black',
        bgImage: 'assets/img/sidebar-bg/01.jpg'
    };
    hideSidebar: boolean;
    iscollapsed = true;
    smallNav = false;
    isSidebar_sm = false;
    isSidebar_lg = false;
    bgColor = 'black';
    bgImage = 'assets/img/sidebar-bg/01.jpg';

    public config: any = {};


    constructor(private elementRef: ElementRef, private configService: ConfigService,
        @Inject(DOCUMENT) private document: Document,
        private renderer: Renderer2) {


    }
    // ngOnDestroy(): void {
    //     throw new Error('Method not implemented.');
    // }

    ngOnInit() {

      this.config = this.configService.interfaceConf;
      this.bgColor = this.config.layout.sidebar.backgroundColor;

      if (!this.config.layout.sidebar.backgroundImage) {
        this.bgImage = '';
      } else {
        this.bgImage = this.config.layout.sidebar.backgroundImageURL;
      }

      if (this.config.layout.variant === 'Transparent') {
        if (this.config.layout.sidebar.backgroundColor.toString().trim() === '') {
          this.bgColor = 'bg-glass-1';
        }
      } else {
        if (this.config.layout.sidebar.backgroundColor.toString().trim() === '') {
          this.bgColor = 'black';
        }
      }

      setTimeout(() => {
        if (this.config.layout.sidebar.size === 'sidebar-lg') {
          this.isSidebar_sm = false;
          this.isSidebar_lg = true;
        } else if (this.config.layout.sidebar.size === 'sidebar-sm') {
          this.isSidebar_sm = true;
          this.isSidebar_lg = false;
        } else {
          this.isSidebar_sm = false;
          this.isSidebar_lg = false;
        }
        this.iscollapsed = this.config.layout.sidebar.collapsed;
        this.smallNav = this.config.layout.sidebar.smallNav;
      }, 0);



    }

    // tslint:disable-next-line: use-lifecycle-interface
    ngAfterViewInit() {
      setTimeout(() => {
        if (this.config.layout.dir) {
          this.options.direction = this.config.layout.dir;
        }


        if (this.config.layout.variant === 'Dark') {
          this.renderer.addClass(this.document.body, 'layout-dark');
        } else if (this.config.layout.variant === 'Transparent') {
          this.renderer.addClass(this.document.body, 'layout-dark');
          this.renderer.addClass(this.document.body, 'layout-transparent');
          if (this.config.layout.sidebar.backgroundColor) {
            this.renderer.addClass(this.document.body, this.config.layout.sidebar.backgroundColor);
          } else {
            this.renderer.addClass(this.document.body, 'bg-glass-1');
          }
          this.bgColor = 'black';
          this.options.bgColor = 'black';
          this.bgImage = '';
          this.options.bgImage = '';
          this.bgImage = '';
          this.renderer.setAttribute(this.sidebarBgImage.nativeElement, 'style', 'display: none');

        }


      }, 0);

    }


    toggleHideSidebar($event: boolean): void {
        setTimeout(() => {
            this.hideSidebar = $event;
        }, 0);
    }

    getOptions($event): void {
        this.options = $event;
    }
}