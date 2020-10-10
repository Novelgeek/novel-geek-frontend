import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AuthService } from './core/_services/auth.service';
import { NotificationService } from './core/_services/notification.service';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnChanges {

    constructor( private authService: AuthService, private notificationService: NotificationService) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (this.authService.isLoggedIn()) {
            this.notificationService.getAllNotifications();
        }
    }

    ngOnInit() {
        this.authService.autoLogin();
        if (this.authService.isLoggedIn()) {
            this.notificationService.getAllNotifications();
        }
    }
}
