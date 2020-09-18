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

    return (this.angularFirestore.firestore.collection(`people`).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {

        people.push({ id: doc.id, ...doc.data() })


      })
      console.log(people)

      return of(people)
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
    return (this.angularFirestore.collection("people").add({ ...data, ownerId: idUser.uid, ownerEmail: idUser.email }))
  }
  // public getPeopleById(id) {
  //   console.log(this.angularFirestore.collection("people").doc(id).get())
  // }
}
