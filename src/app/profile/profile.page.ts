import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage  {

  constructor(public afAuth: AngularFireAuth, public navCtr: NavController, public menuCtrl: MenuController) {
    this.menuCtrl.enable(true);
  }


    signOut() {
      this.afAuth.auth.signOut().then(() => {
        this.navCtr.navigateRoot('/login');;
      });

     }

}
