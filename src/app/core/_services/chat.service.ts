import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { firestore } from 'firebase/app';
import { map, switchMap } from 'rxjs/operators';
import { Observable, combineLatest, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(
    private afs: AngularFirestore,
    private auth: AuthService,
    private router: Router
  ) {}


  getCollecetionId(id1: number, id2: number) {
    if (id1 < id2) {
      return id1 + '_' + id2
    } else {
      return id2 + '_' + id1
    }
  }

  get(targetUserId) {
    const uid = this.auth.currentUser.id;
    const collId = this.getCollecetionId(+uid, targetUserId);
    return this.afs
      .collection<any>(collId.toString())
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as {};
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );
  }



  async sendMessage(targetUserId, content) {
    const uid = this.auth.currentUser.id;
    const collId = this.getCollecetionId(+uid, targetUserId);
    const data = {
      from: uid,
      to: targetUserId,
      message: content,
      createdAt: Date.now(),
    };

    if (uid) {
      const ref = this.afs
        .collection(collId.toString())
      return ref.add(data);
    }
  }


}
