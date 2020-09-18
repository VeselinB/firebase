import { Component } from '@angular/core';
import { FirebaseService } from './service/firebase.service';
import { AngularFirestore } from "@angular/fire/firestore"
import { PeopleService } from './service/people.service';
import { Router } from '@angular/router';
import { fromEvent } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private router: Router, public peopleService: PeopleService, public authService: FirebaseService, private angularFirestore: AngularFirestore) {
    authService.sharedEmail.subscribe(email => {
      this.email = email;
    })
  }
  ngOnInit() {
    this.authService.getEmail();
    if (localStorage.getItem("user") !== null) {
      this.authService.isLoggedIn = true;
    }

    // this.angularFirestore.collection("people").add({ user: "user", ownerID: "123" })
    // // this.angularFirestore.collection("people").valueChanges().subscribe(data => {
    // //   console.log(data)
    // // })
    // // this.angularFirestore.doc("Ah7AKMFOECg5Lbz8fI7u").delete()
    // //
    // let userDoc = this.angularFirestore.firestore.collection(`people`);
    // userDoc.get().then((querySnapshot) => {
    //   querySnapshot.forEach((doc) => {
    //     console.log(doc.id, "=>", doc.data());
    //     this.angularFirestore.collection("people").doc(doc.id).update({ "user": "test" })
    //   })
    // })

    // this.angularFirestore
    //   .collection("people")
    //   .doc("MINJ9eR59AM86HTA60hk")
    //   .delete();

  }
  title = 'firebaseApp';
  email;

  getUserInfo() {
    this.authService.test()
  }
  create() {
    this.angularFirestore.collection("people").add({ user: "user", ownerID: "123" })
  }


  checkLocalStorageForLoggedUser() {
    return !localStorage.getItem("user")
  }


  signOut() {
    let userDoc = this.angularFirestore.firestore.collection(`people`);
    // userDoc.get().then((querySnapshot) => {
    //   querySnapshot.forEach((doc) => {
    //     console.log(doc.id, "=>", doc.data());
    //     // this.angularFirestore.collection("people").doc(doc.id).update({ "user": "test" })
    //     this.angularFirestore.collection("people").doc(doc.id).delete()
    //   })
    // })

    this.authService.logout()
    this.email = null;

    this.router.navigate(['/auth/login']);
  }


}
