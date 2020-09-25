import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth"
import { of, BehaviorSubject, from, Observable } from 'rxjs';

import { auth } from 'firebase/app';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  isLoggedIn = false;

  constructor(public fireBaseAuth: AngularFireAuth) { }

  private email = new BehaviorSubject('');
  private photoUrl = new BehaviorSubject('');
  sharedEmail = this.email.asObservable();
  sharedPhotoURl = this.photoUrl.asObservable();
  getPhotoUrl() {
    let gEmail;
    this.fireBaseAuth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        gEmail = user.email
        console.log(user.email, "test")
        this.photoUrl.next(user.photoURL)
        // ...
      } else {
        gEmail = "No logged user!"
        this.email.next("No logged user!")
      }
    }).then(res => {
      console.log(res)
    });

  }
  getUserData() {
    return this.fireBaseAuth.currentUser
  }

  updateUserData(data) {
    return this.fireBaseAuth.currentUser.then(user => {
      user.updateProfile(data)
      // .then(function () {
      //   console.log("updated")
      // }).catch(function (error) {
      //   // An error happened.
      // });
    });



  }

  getEmail() {
    let gEmail;
    this.fireBaseAuth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        gEmail = user.email
        console.log(user.email, "test")
        this.email.next(user.email)
        // ...
      } else {
        gEmail = "No logged user!"
        this.email.next("No logged user!")
      }
    }).then(res => {
      console.log(res)
    });

  }
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  AuthLogin(provider) {
    return this.fireBaseAuth.signInWithPopup(provider)
      .then((result) => {
        console.log('You have been successfully logged in!')
      }).catch((error) => {
        console.log(error)
      })
  }


  loginViaGoogle(): Observable<auth.UserCredential> {

    return from(this.fireBaseAuth.signInWithPopup(new auth.GoogleAuthProvider()));
  }


  test() {
    this.fireBaseAuth.onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        console.log(user.displayName, user.email)
        // ...
      } else {
        // User is signed out.
        // ...
      }
    });
  }



  async signIn(email: string, password: string) {
    await this.fireBaseAuth.signInWithEmailAndPassword(email, password).then(
      res => {
        this.isLoggedIn = true;
        this.email.next(res.user.email)
        // ...
        localStorage.setItem("user", JSON.stringify(res.user))

      }
    )
  }

  async signUp(email: string, password: string) {
    return await this.fireBaseAuth.createUserWithEmailAndPassword(email, password)
  }

  logout() {
    this.fireBaseAuth.signOut();
    localStorage.removeItem('user');
    this.isLoggedIn = false;
  }
}
