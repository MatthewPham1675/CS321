import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {  Router, NavigationExtras} from '@angular/router';
@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {
  items = [];
  constructor(private db: AngularFirestore, private router: Router) {
    this.db.collection('Items').snapshotChanges().subscribe(colsnap =>  {
      this.items = [];
      colsnap.forEach(snap => {
        const item: any = snap.payload.doc.data();
        this.items.push(item);
      });
    });
  }
  ngOnInit() {
  }
  expand(ite: any){
    const navigationExtras: NavigationExtras = {
      state: {
        item: ite
      }

    };
    this.router.navigate(['expand'], navigationExtras  );
  }
}
