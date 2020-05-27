import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/core/_services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-group-home',
  templateUrl: './group-home.component.html',
  styleUrls: ['./group-home.component.scss']
})
export class GroupHomeComponent implements OnInit {
  user: any;
  constructor(private authSerice: AuthService, private http: HttpClient,
              private modalService: NgbModal) { }

  ngOnInit() {
  }

  test() {
    // subscribe to the user
    this.authSerice.user.subscribe( user => {
      this.user = user;
    })

    // then you can get the token like this
    console.log(this.user.token);

    // create header
    const headerDict = {
      'Authorization' : 'Bearer ' + this.user.token
    }

    // convert to httpheader
    const requestOptions = {
      headers: new HttpHeaders(headerDict)
    };

    // sending a test request attatch the header
    this.http.get('http://localhost:8080/user/me', requestOptions);
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      
    }, (reason) => {
      
    });
  }

}
