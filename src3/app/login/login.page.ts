import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {auth} from 'firebase/app';
import {AlertController} from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';

import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  password = '';
  username = '';

  random(): number {
    const rand = Math.floor(Math.random() * 20) + 1000;
    return rand;
 }
   constructor(
     public afAuth: AngularFireAuth,
     public alert: AlertController,
     public router: Router,
     public navCtrl: NavController) { }

   ngOnInit() {
   }

   async login() {
    const {username, password} = this;
    try {
      const split1 = username.split('@');
      const split2 = split1[1].split('.');
      if ( split2[0] === 'masonlive' && split2[1] === 'gmu' && split2[2] === 'edu') {
        try {
        const res = await this.afAuth.auth.signInWithEmailAndPassword(split1[0] + '@mail.com', password);
        if (res) {
          this.showAlert('Welcome', 'Heading to your feed');
          this.navCtrl.navigateForward(['tabs']);
        }

        } catch (err) {
          this.showAlert('Error!', err);
        }
      }

    } catch (er) {
      this.showAlert('Error!', 'Not valid gmail');
    }
   }
   async showAlert(header: string, message: string) {
     const alert = this.alert.create({
       header,
       message,
       buttons: ['Ok']
     });

     (await alert).present();
   }
   go() {
    this.navCtrl.navigateForward(['register']);
   }
}
