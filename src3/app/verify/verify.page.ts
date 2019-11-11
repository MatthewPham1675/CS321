import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.page.html',
  styleUrls: ['./verify.page.scss'],
})
export class VerifyPage implements OnInit {
  data: any;
  num: number;
  constructor(
    private router: Router,
    private alert: AlertController
    ) {
    if (this.router.getCurrentNavigation().extras.state) {
    this.data = this.router.getCurrentNavigation().extras.state;
    }
  }

  ngOnInit() {
  }

  verify() {
    try {
      if (this.data[0] === this.num) {
        this.showAlert( 'AccepteD ', 'Nice you will proceed to enter your username and password');
        this.router.navigate(['signup']);
      } else {
        this.showAlert('error', 'verification nummber not the same');
        this.router.navigate(['register']);
      }
    } catch {
      this.showAlert('error', 'Something went wrong');
      this.router.navigate(['register']);

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
