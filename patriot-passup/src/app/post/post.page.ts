
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Storage } from '@ionic/storage';
import {AlertController} from '@ionic/angular';
import { Http } from '@angular/http';
import { UserService } from '../user.service';
import { firestore } from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})


export class PostPage {

  public photos: Photo[] = [];
  public name = '';
  public price: number ;
  public description = '';
  imageURL: string;
  public gmail = this.user.afAuth.auth.currentUser.email;

  constructor(
    public navCtr: NavController,
    private camera: Camera,
    public storage: Storage,
    public db: AngularFirestore,
    public afstore: AngularFirestore,
    public http: Http,
    public user: UserService,
    public alert: AlertController) {

  }

  createPost() {

    if ((this.imageURL === null) || (this.name === '') || (this.price === null) || (this.description === '') ) {
      this.showAlert('Sorry', 'You have incomplete fields');
      return;
    }

    const image = this.imageURL;
    const name = this.name;
    const  description = this.description;
    const  price = this.price;
    const buyers = [];
    const photo = image;
    const sellerid = this.user.getUID();
    const seller = this.user.afAuth.auth.currentUser.email;

    this.afstore.doc(`Users/${this.user.getUID()}`).update({
      items: firestore.FieldValue.arrayUnion({
        image,
        name,
        description,
        price,
        buyers
      })
    });

    this.showAlert('Congrats!', 'Item Uploaded');

    this.afstore.doc(`Items/${name + seller}`).set({

      name,
      photo,
      price,
      description,
      seller,
      sellerid
    });

    this.price = null;
    this.imageURL = null;
    this.description = '';
    this.name = '';

  }


  fileChanged(event) {
    const files = event.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('UPLOADCARE_STORE', '1');
    data.append('UPLOADCARE_PUB_KEY', 'd03ffdee519344e3a574');

    this.http.post('https://upload.uploadcare.com/base/', data)

    .subscribe( event => {
        console.log(files);
        this.imageURL = event.json().file;
    });

  }



  loadImage() {
    this.photos = [];
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 200,
      targetHeight: 200,
    };


    this.camera.getPicture(options).then((imageData) => {
      // Add new photo to gallery
      this.photos.unshift({
        data: 'data:image/jpeg;base64,' + imageData
      });

      // Save all photos for later viewing
      this.storage.set('photos', this.photos);
    }, (err) => {

     // Handle error
     console.log('Camera issue: ' + err);
    });

  }

  async post() {
    if((this.photos === []) || (this.name === '') || (this.price === null) || (this.description === '') ){
      this.showAlert('Sorry', 'You have incomplete fields');
      return;
    }

    const Item = {
      photo: this.photos[0],
      name: this.name,
      description: this.description,
      price: this.price
    };


    try {
      this.db.collection('Items').add(Item);
      this.price = 0;
      this.photos = [];
      this.description = '';
      this.name = '';
      this.showAlert('Congrats!', 'Item Uploaded');
    } catch {
      this.showAlert('Sorry', 'Please try Again');
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


  reload() {
    window.location.reload();
  }
}

class Photo {
  data: any;
}