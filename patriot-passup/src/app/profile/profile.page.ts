import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { MenuController, NavController, AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from '../user.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage  {

  userPosts

  constructor( private alert: AlertController, private user: UserService, private afs: AngularFirestore, private afAuth: AngularFireAuth, public navCtr: NavController, public menuCtrl: MenuController) {
    this.menuCtrl.enable(true);
    const items= afs.doc(`Users/${user.getUID()}`)
    this.userPosts = items.valueChanges()
  }

  async showConfirmAlert(item) {
    const itemDoc= this.afs.doc(`Users/${item}`)
    const alertConfirm = this.alert.create({
      header: 'Delete Items',
      message: 'Have you sold this item?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('No clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            itemDoc.delete();
            console.log('Yes clicked');
          }
        }
      ]
    });
    (await alertConfirm).present();
  }


    help() {
      this.navCtr.navigateRoot('/help');
    }


    signOut() {
      this.afAuth.auth.signOut().then(() => {
        this.navCtr.navigateRoot('/login');
      });

     }

}
