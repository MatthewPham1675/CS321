import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AlertController} from '@ionic/angular';
import { AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import { firestore } from 'firebase/app';
@Component({
  selector: 'app-expand',
  templateUrl: './expand.page.html',
  styleUrls: ['./expand.page.scss'],
})
export class ExpandPage implements OnInit {
  item: any;
  constructor(
    private router: Router,
    private alert: AlertController,
    private afstore: AngularFirestore) {
      if (this.router.getCurrentNavigation().extras.state) {
        this.item = this.router.getCurrentNavigation().extras.state.item;
      }
    }

  ngOnInit() {
  }
  back() {
    this.router.navigate(['tabs']);
  }
  buying() {
    const seller = this.item.seller;
    this.afstore.doc(`Users/${this.item.seller}`).update({
      buyers: firestore.FieldValue.arrayUnion({
        seller
      })
    });
    this.showAlert('Congrats', 'Your on the buyer list' );
  }
  async showAlert(header: string, message: string) {
    const alert = this.alert.create({
      header,
      message,
      buttons: ['Ok']
    });

    (await alert).present();
  }
}
