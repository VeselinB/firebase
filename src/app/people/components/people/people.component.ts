import { Component, OnInit } from '@angular/core';
import { PeopleService } from 'src/app/service/people.service';
import { People } from 'src/app/model/people';
import { Store } from '@ngrx/store';
import * as PeopleActions from "../../people.actions"
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {
  public people: People[] = [];

  loading;
  userId;
  showPeopleByChoosenOptionsBool = false;
  constructor(public store: Store<any>, public peopleService: PeopleService, private dialog: MatDialog) {
    this.getPeople()
  }

  ngOnInit() {
    // this.getPeople()

  }
  getPeople() {
    this.store.select(store => store.people).subscribe(store => {
      this.people = Object.values(store.entities)
      this.peopleService.sharedLoading.subscribe(res => {
        this.loading = res;
      })
    })
    this.store.dispatch(PeopleActions.getAllPeopleStart());
    this.userId = this.checkForUserId();
    console.log(this.userId)
  }
  showPeopleByChoosenOptions(data) {
    if (data == "true") {
      let userid = this.checkForUserId();
      let result = this.people.filter((p) => p.ownerId == userid)
      console.log(result)
      this.people = result

    } else {
      this.getPeople()
    }

  }
  checkForUserId() {
    let loggedUserId = JSON.parse(localStorage.getItem("user"))
    loggedUserId = loggedUserId.uid
    return loggedUserId
  }

  editPeople(data) {
    this.openDialog(data)
    console.log(data)
    let id = "";
    let updates = "";
    this.peopleService.updatePeopleById(id, updates)
  }

  remove(id) {
    this.peopleService.deletePeopleById(id).then(() => {
      console.log("deleted")
      this.store.dispatch(PeopleActions.removePeople({ id: id }))
    })
    //this.getPeople()
  }

  openDialog(data): void {
    console.log(data)
    let editable = false;

    const dialogRef = this.dialog.open(DialogComponent, {
      width: '350px',
      data: data
    });
    dialogRef.afterClosed().subscribe(
      data => {

        if (data.data == false) {
          // console.log(data)
          return;
        }

        this.peopleService.updatePeopleById(data.id, data).then(() => {
          this.store.dispatch(PeopleActions.updatePeople({ update: data }))
        })


        console.log("Dialog output:", data)


      }

    );
  }
}
