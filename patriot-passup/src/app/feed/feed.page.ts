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

  public itemList: any[];
  public loadedItem: any[];

  constructor(private firestore: AngularFirestore, private router: Router) {
    this.firestore.collection('Items').snapshotChanges().subscribe(colsnap =>  {
      this.items = [];
      colsnap.forEach(snap => {
        const item: any = snap.payload.doc.data();
        this.items.push(item);
      });
    });
  }

  ngOnInit() {
    this.firestore.collection('Items').valueChanges().subscribe(itemList => {
      this.itemList = itemList;
      this.loadedItem = itemList;
    })
  }

  initializeItems(): void {
    this.itemList = this.loadedItem;
  }

  filterList(evt) {
    this.initializeItems();

    const searchItem = evt.srcElement.value;

    if(!searchItem) {
      return;
    }

    this.itemList = this.itemList.filter(currentItem => {
      if(currentItem.name && searchItem) {
        if(currentItem.name.toLowerCase().indexOf(searchItem.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    })
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