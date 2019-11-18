import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { MenuController, NavController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage  {

  userPosts

  constructor(private user: UserService, private afs: AngularFirestore, private afAuth: AngularFireAuth, public navCtr: NavController, public menuCtrl: MenuController) {
    this.menuCtrl.enable(true);
    const items= afs.doc(`Users/${user.getUID()}`)
    this.userPosts = items.valueChanges()
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
