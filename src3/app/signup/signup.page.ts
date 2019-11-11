import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {auth} from 'firebase/app';
import {AlertController} from '@ionic/angular';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

import { Item } from '../item.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  username = '';
  password = '';
  cpassword = '';
  constructor(
    public afAuth: AngularFireAuth,
    public alert: AlertController,
    public router: Router,
    public navCtrl: NavController,


  ) { }

  ngOnInit() {
  }
  async register() {
    const {username, password, cpassword} = this;
    if (password !== cpassword) {
      this.showAlert('Error!', 'Password does not match');
      return console.error('Password does not match');
    }

    try {
      const split1 = username.split('@');
      const split2 = split1[1].split('.');
      if ( split2[0] === 'masonlive' && split2[1] === 'gmu' && split2[2] === 'edu') {
        const res = await this.afAuth.auth.createUserWithEmailAndPassword(split1[0] + '@mail.com', password);

        this.showAlert('Success!', 'Welcome aboard!');
        console.log(res);
        // this.router.navigate(['/tabs']);
        return;
      } else {
        this.showAlert('Error!', 'IncorrectGmail');
      }
    } catch (err) {
      console.dir(err);
      this.showAlert('Error!', 'Incorrect Gmail');

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

}
