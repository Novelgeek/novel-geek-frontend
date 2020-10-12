import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/_services/auth.service';
import { NotificationService } from './core/_services/notification.service';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    constructor( private authService: AuthService, private notificationService: NotificationService) {}

    ngOnInit() {
        this.authService.autoLogin();
        this.notificationService.getAllNotifications();
    }
}
