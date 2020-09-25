import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PeopleService } from 'src/app/service/people.service';
import { Store } from '@ngrx/store';
import * as PeopleActions from "../../people.actions"
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-create-people',
  templateUrl: './create-people.component.html',
  styleUrls: ['./create-people.component.scss']
})
export class CreatePeopleComponent implements OnInit {
  dialogTitle = "Create person"
  form: FormGroup;
  constructor(public store: Store<any>, private formBuilder: FormBuilder, private router: Router, public peopleSrvice: PeopleService, public dialogRef: MatDialogRef<CreatePeopleComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {

  }



  ngOnInit() {
    this.form = this.formBuilder.group({
      firstName: ["", Validators.required],
      secondName: ["", Validators.required],
      age: ["", Validators.required],
      img: "",
      adress: ""
    });
  }


  close(): void {
    this.dialogRef.close({ data: false });
  }

  save() {
    this.dialogRef.close({ people: this.form.value });
  }


  // create() {
  //   // console.log(this.form.value)
  //   this.store.dispatch(PeopleActions.createPeopleStart({ people: this.form.value }))
  //   //this.peopleSrvice.createPeople(this.form.value)
  //   this.router.navigate(['/people/people']);
  // }

  resetForm() {
    this.form.reset()
  }

}
