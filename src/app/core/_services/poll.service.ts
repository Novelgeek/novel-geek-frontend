
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Poll } from '../_models/poll.model';

@Injectable({providedIn: 'root'})
export class PollService {

  constructor(private http: HttpClient) { }

  getPolls(){
    return this.http.get<any>('http://localhost:8080/poll/allpolls');
  }

  getPollsForUser(id) {
    return this.http.get<any>('http://localhost:8080/poll/mypolls');
  }

  getPoll(id) {
    return this.http.get('http://localhost:8080/poll/' + id);
  }

  savePoll(poll: Poll) {
    return this.http.post('http://localhost:8080/poll/newpoll', poll);
  }

  deletePoll(pollId: number) {
    return this.http.delete('http://localhost:8080/poll/delete' + pollId);
  }

  vote(pollId: string, selectedOption: number){
    return this.http.post('http://localhost:8080/poll/' + pollId + '/vote/' + selectedOption, {});
  }
}
