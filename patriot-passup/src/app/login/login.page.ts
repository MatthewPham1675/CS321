import { Component, ViewChild, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { MenuController, NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { UserService } from '../user.service';

import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  
})
export class LoginPage {

  masonEmail = false;
  hasVerifiedEmail = true; 
  sentTimestamp;

  constructor(public afAuth: AngularFireAuth,
              public user: UserService, 
              public navCtr: NavController, 
              public menuCtrl: MenuController,
              public alert: AlertController,
              public afstore: AngularFirestore) {
    this.menuCtrl.enable(true);
    this.afAuth.authState.subscribe(user => {
      if (user){ 
        this.hasVerifiedEmail = this.afAuth.auth.currentUser.emailVerified;
        if (this.hasVerifiedEmail){
            this.signIn();
        }
      }   
    });
  }

  async signIn() {
    try {
      const username = this.afAuth.auth.currentUser.email;      

      if(this.afAuth.auth.currentUser)
        this.user.setUser({
          username,
          uid: this.afAuth.auth.currentUser.uid
      })
      this.navCtr.navigateRoot('/tabs');

    } catch(error) {
        console.dir(error)
    }
  }

    masonCheck() {
      const username = this.afAuth.auth.currentUser.email;
      const split1 = username.split('@');
      const split2 = split1[1].split('.');
      if ( split2[0] === 'masonlive' && split2[1] === 'gmu' && split2[2] === 'edu') {
        this.showAlert('Welcome', 'Now send yourself a verification Email');
        this.masonEmail = true;
      }
      else if (split2[0] === 'gmu' && split2[1] === 'edu'){
        this.showAlert('Welcome', 'Now send yourself a verification Email');
        this.masonEmail = true;
      }
      else {
      this.showAlert('Error!', 'Not valid Gmu email');
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
    
    signOut() {
      this.afAuth.auth.signOut().then(() => {
        location.reload();
      });

      }

    sendVerificationEmail(){
      try {
        this.afAuth.auth.currentUser.sendEmailVerification();
        this.sentTimestamp = new Date();
      } catch(error) {
          this.showAlert('ERROR', 'email is incorrect');
      }

      try {
        const username = this.afAuth.auth.currentUser.email;
        const uid = this.afAuth.auth.currentUser.uid;
        

        this.afstore.doc(`Users/${uid}`).set({
          username
        })

        this.user.setUser({
          username,
          uid,
        })
        this.showAlert('Welcome', 'CONFIRM');

      } catch(error) {
          console.dir(error)
      }
    }

    reload(){
      window.location.reload();
    }
  }

    


