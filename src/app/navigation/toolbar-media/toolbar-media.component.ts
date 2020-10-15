import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/service/firebase.service';
import { Router } from '@angular/router';
import { EditDataComponent } from 'src/app/users/components/edit-data/edit-data.component';
import { MatDialog } from '@angular/material';
import { DataService } from '../data.service';
import { PeopleService } from 'src/app/service/people.service';

@Component({
  selector: 'app-toolbar-media',
  templateUrl: './toolbar-media.component.html',
  styleUrls: ['./toolbar-media.component.scss']
})
export class ToolbarMediaComponent implements OnInit {
  signUp;
  signIn;
  LogOut;
  filterUserPeople;
  filteAllrUserPeople;
  email;
  photoURL;
  angularFirestore: any;
  constructor(public peopleService: PeopleService, public data: DataService, private dialog: MatDialog, public authService: FirebaseService, private router: Router) {

    this.signIn = this.data.login();
    this.signUp = this.data.register();
    this.LogOut = this.data.signOut()
    this.filterUserPeople = this.data.people()
    this.filteAllrUserPeople = this.data.allPeople()

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
  public filterPeople(data) {
    this.peopleService.filterPeople(data)
  }

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
  signOut() {
    //let userDoc = this.angularFirestore.firestore.collection(`people`);
    // userDoc.get().then((querySnapshot) => {
    //   querySnapshot.forEach((doc) => {
    //     console.log(doc.id, "=>", doc.data());
    //     // this.angularFirestore.collection("people").doc(doc.id).update({ "user": "test" })
    //     this.angularFirestore.collection("people").doc(doc.id).delete()
    //   })
    // })

    this.authService.logout()
    localStorage.clear()
    this.photoURL = "";
    this.email = null;

    this.router.navigate(['/auth/login']);
  }

  checkLocalStorageForLoggedUser() {
    return !localStorage.getItem("user")
  }
}
