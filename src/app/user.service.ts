import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth';

interface user {
    username: string,
    uid: string,
}

@Injectable()
export class UserService {
    private user: user

    constructor(public afAuth: AngularFireAuth) {

    }

    setUser(user: user) {
        this.user = user
    }

    getUID() {
        return this.afAuth.auth.currentUser.uid
    }
}