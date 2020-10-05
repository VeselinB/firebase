import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/service/firebase.service';
import { Router } from '@angular/router';
import { EditDataComponent } from 'src/app/users/components/edit-data/edit-data.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-toolbar-media',
  templateUrl: './toolbar-media.component.html',
  styleUrls: ['./toolbar-media.component.scss']
})
export class ToolbarMediaComponent implements OnInit {
  email;
  photoURL;
  angularFirestore: any;
  constructor(private dialog: MatDialog, public authService: FirebaseService, private router: Router) {
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
