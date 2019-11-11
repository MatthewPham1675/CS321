import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {auth} from 'firebase/app';
import {AlertController} from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';
import { HTTP } from '@ionic-native/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  gmail = '';


 random(): number {
   const rand = Math.floor(Math.random() * 20) + 1000;
   return rand;
}
  constructor(
    public afAuth: AngularFireAuth,
    public alert: AlertController,
    public router: Router,
    public navCtrl: NavController,
    public cordovaHttp: HTTP
    ) { }

  ngOnInit() {
  }

  register() {
    const {gmail} = this;
    const splitmail = this.gmail.split('@');
    const splitmail2 = this.gmail.split('.');
    const random: number = this.random();
    const message = 'Please enter' + random;
    if (splitmail[1] !== '@masonlive.gmu.edu') {
      this.showAlert('Error!', 'Not Valid Email');
      return console.error('Not Valid Email');
    }
    try {
      this.send(message);

     // Send a text message using default options
      this.showAlert('Nice', 'Email Sent');
      const navigationExtras: NavigationExtras = {
      state: {
        rand: random,
        gmail: this.gmail
      }

    };
      this.router.navigate(['verify'], navigationExtras  );

    } catch (error) {
      this.showAlert('Error', 'Not Valid Email');
      return console.error('Not Valid Email');
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
  send(message: string) {
    const mailgunApiKey = 'pubkey-013a82b75c10f43c925c1c2782cd66e7';
    const mailgunurl = 'gmu.patriotpassup.com';
    const headers = {
      Authorization : 'Basic ' + mailgunApiKey,
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    const body = {
      from: 'patriotpassup@mail.com',
      to: this.gmail,
      subject: 'Welcome to PatriotPassUp',
      text: message
    };
    const url = 'https://api.mailgun.net/v3/' + mailgunurl + '/messages';
    return this.cordovaHttp.post(url, body, headers);
  }
}
