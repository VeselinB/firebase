import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore"
import { of, from, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  private loading = new BehaviorSubject(true);
  constructor(public angularFirestore: AngularFirestore) { }
  public getAllPeople() {
    //let people = {};
    let people = [];
    let reversed = []
    // databaseReference.orderByChild("newsDate").startAt(new DateTime())
    return from(this.angularFirestore.firestore.collection(`people`).orderBy("creationDate", "desc").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {

        people.push({ id: doc.id, ...doc.data() })



      })
      console.log(people)
      this.getLoadingStatus()
      reversed = [...people].reverse();
      console.log(reversed, people)
      return people
    }))

  }
  sharedLoading = this.loading.asObservable();
  getLoadingStatus() {
    this.loading.next(false)
  }
  public deletePeopleById(id) {
    return this.angularFirestore.collection("people").doc(id).delete()
  }


  public updatePeopleById(id, updates) {
    return this.angularFirestore.collection("people").doc(id).update(updates)
  }
  createPeople(data) {
    let idUser = JSON.parse(localStorage.getItem("user"));
    return (this.angularFirestore.collection("people").add({ ...data, ownerId: idUser.uid, ownerEmail: idUser.email, creationDate: new Date() }))
  }
  // public getPeopleById(id) {
  //   console.log(this.angularFirestore.collection("people").doc(id).get())
  // }
}
