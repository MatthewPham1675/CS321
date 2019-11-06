import { Component, ViewChild, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  
})
export class LoginPage {

    constructor(public afAuth: AngularFireAuth, public navCtr: NavController, public menuCtrl: MenuController) {
      this.menuCtrl.enable(true);
    }


      signOut() {
        this.afAuth.auth.signOut().then(() => {
          location.reload();
        });
  
       }

      nextPage(){
        this.navCtr.navigateRoot('/tabs');
      }
    }

    


