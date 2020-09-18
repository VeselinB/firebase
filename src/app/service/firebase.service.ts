import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth"
import { of, BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  isLoggedIn = false;

  constructor(public fireBaseAuth: AngularFireAuth) { }

  private email = new BehaviorSubject('');
  sharedEmail = this.email.asObservable();
  getEmail() {
    this.email.next(JSON.parse(localStorage.getItem("user")).email)
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
        localStorage.setItem("user", JSON.stringify(res.user))

      }
    )
  }

  async signUp(email: string, password: string) {
    await this.fireBaseAuth.createUserWithEmailAndPassword(email, password).then(
      res => {
        this.isLoggedIn = true;
        localStorage.setItem("user", JSON.stringify(res.user))
      }
    )
  }

  logout() {
    this.fireBaseAuth.signOut();
    localStorage.removeItem('user');
    this.isLoggedIn = false;
  }
}
