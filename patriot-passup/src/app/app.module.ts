import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import {FirebaseUIModule, firebase, firebaseui} from 'firebaseui-angular';

import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { Camera } from '@ionic-native/camera/ngx';
import {IonicStorageModule} from '@ionic/storage';

import {AngularFirestoreModule} from '@angular/fire/firestore';
import { AngularFireFunctionsModule, FunctionsRegionToken } from '@angular/fire/functions'
import { UserService } from './user.service';
import { HttpModule } from '@angular/http';


const firebaseUiAuthConfig: firebaseui.auth.Config = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ],
  tosUrl: '/terms',
  privacyPolicyUrl: '/privacy',
  credentialHelper: firebaseui.auth.CredentialHelper.NONE,
};


@NgModule({
  declarations: [AppComponent, 
  ],
  entryComponents: [
  ],
  imports: [
      BrowserModule, 
      IonicModule.forRoot(),
      AppRoutingModule,
      AngularFireModule.initializeApp(environment.firebaseConfig),
      AngularFireAuthModule,
      FirebaseUIModule.forRoot(firebaseUiAuthConfig),
      IonicStorageModule.forRoot(),
      AngularFirestoreModule,
      AngularFireFunctionsModule,
      HttpModule,
    ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    UserService,
    { provide: FunctionsRegionToken, useValue: 'us-central1'},
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
