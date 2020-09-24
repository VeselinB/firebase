import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { PeopleService } from 'src/app/service/people.service';
import { People } from 'src/app/model/people';
import { Store } from '@ngrx/store';
import * as PeopleActions from "../../people.actions"
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { CreatePeopleComponent } from '../create-people/create-people.component';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {
  public people: People[] = [];
  public peopleFS: People[] = []
  search;
  loading;
  userId;
  showPeopleByChoosenOptionsBool = false;
  @ViewChild('callAPIDialog', { static: true }) callAPIDialog: TemplateRef<any>;
  constructor(public store: Store<any>, public peopleService: PeopleService, private dialog: MatDialog) {
    this.getPeople()
  }

  ngOnInit() {


  }
  searchF() {
    this.getPeople()
    this.store.select(store => store.people).subscribe(store => {
      let result = this.peopleFS.filter((p) => p.secondName.toLowerCase().search(this.search.toLowerCase()) != -1
        || p.firstName.toLowerCase().search(this.search.toLowerCase()) != -1
        || p.adress.toLowerCase().search(this.search.toLowerCase()) != -1
        || p.age.toString().toLowerCase().search(this.search.toLowerCase()) != -1
      )
      console.log(result)
      this.people = result

      if (this.search == "") {
        this.getPeople()
      }
    })
  }

  getPeople() {
    this.store.select(store => store.people).subscribe(store => {
      this.people = Object.values(store.entities)
      this.peopleFS = Object.values(store.entities)
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
    this.openDialogEdit(data)
    console.log(data)
    let id = "";
    let updates = "";
    //this.peopleService.updatePeopleById(id, updates)
  }
  createPeople() {
    this.openDialogCreate()
    console.log()
    let id = "";
    let updates = "";
  }



  remove(id) {
    let dialogRefConfirm = this.dialog.open(this.callAPIDialog);
    dialogRefConfirm.afterClosed().subscribe(result => {

      if (result !== undefined) {
        if (result === 'yes') {

          this.peopleService.deletePeopleById(id).then(() => {
            console.log("deleted")
            this.store.dispatch(PeopleActions.removePeople({ id: id }))
          })
          console.log('User clicked yes.');
        } else if (result === 'no') {

          //  console.log('User clicked no.');
        }
      }
    })

    //this.getPeople()
  }
  openDialogCreate(): void {

    let editable = false;

    const dialogRef = this.dialog.open(CreatePeopleComponent, {
      width: '350px',

    });



    dialogRef.afterClosed().subscribe(
      data => {

        if (data == undefined) {
          // console.log(data)
          return;
        }

        this.store.dispatch(PeopleActions.createPeopleStart(data))


        console.log("Dialog output:", data)


      }

    );
  }
  openDialogEdit(data): void {
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
