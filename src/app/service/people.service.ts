import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore"
import { of, from, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  private loading = new BehaviorSubject(true);
  private filterPeopleByUser = new BehaviorSubject('false');

  sharedFilterPeopleByUser = this.filterPeopleByUser.asObservable();
  sharedLoading = this.loading.asObservable();
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

      this.getLoadingStatus()

      return people
    }))

  }

  getLoadingStatus() {
    this.loading.next(false)
  }

  filterPeople(data) {
    this.filterPeopleByUser.next(data)
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
