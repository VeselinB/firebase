
import { Component } from '@angular/core';
import { FirebaseService } from '../service/firebase.service';
import { AngularFirestore } from "@angular/fire/firestore"
import { PeopleService } from '../service/people.service';
import { Router } from '@angular/router';
import { fromEvent } from 'rxjs';
import { MatDialog } from '@angular/material/dialog'; import { EditDataComponent } from '../users/components/edit-data/edit-data.component';

;
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

  constructor(private dialog: MatDialog, private router: Router, public peopleService: PeopleService, public authService: FirebaseService, private angularFirestore: AngularFirestore) {

    authService.sharedEmail.subscribe(email => {
      this.email = email;
    })

    authService.sharedPhotoURl.subscribe(photo => {
      this.photoURL = photo
    })

  }
  ngOnInit() {

    this.authService.getEmail();
    this.authService.getPhotoUrl();


  }
  title = 'firebaseApp';
  email;
  photoURL;
  getUserData() {

    //   this.db.collection('users').doc('some_uid').valueChanges().subscribe((response) => {
    //     this.currentUser = response;
    // });
    let userData;
    this.authService.getUserData().then(res => {
      if (res != null) {
        this.photoURL = res.providerData[0].photoURL
        console.log(this.photoURL, "p")
        console.log(res.providerData[0])
        this.openDialog(res.providerData[0])
      }

    })
  }
  openDialog(data): void {
    console.log(data)
    let editable = false;

    const dialogRef = this.dialog.open(EditDataComponent, {
      width: '350px',
      data: data
    });

    dialogRef.afterClosed().subscribe(
      data => {

        if (data.data == false) {
          // console.log(data)
          return;
        }

        console.log(data)
        this.authService.updateUserData(data).then(function () {
          console.log(data)
          this.authService.getPhotoUrl();
        }).catch(function (error) {
          console.log("An error happened")
        });
      })


    console.log("Dialog output:", data)

  }



  // getUserInfo() {
  //   this.authService.test()
  // }
  // create() {
  //   this.angularFirestore.collection("people").add({ user: "user", ownerID: "123" })
  // }


  checkLocalStorageForLoggedUser() {
    return !localStorage.getItem("user")
  }


  signOut() {
    let userDoc = this.angularFirestore.firestore.collection(`people`);

    this.authService.logout()
    localStorage.clear()
    this.photoURL = "";
    this.email = null;

    this.router.navigate(['/auth/login']);
  }


}
