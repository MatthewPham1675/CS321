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
        if(!this.user) {
            if(this.afAuth.auth.currentUser.uid) {
                const user = this.afAuth.auth.currentUser
                this.setUser({
                    username: user.email,
                    uid: user.uid
                })
                return user.uid
            } else {
                throw new Error("User not logged in")
            }
            
        }

        return this.afAuth.auth.currentUser.uid
    }
}