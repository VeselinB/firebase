import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PeopleService } from 'src/app/service/people.service';
import { Store } from '@ngrx/store';
import * as PeopleActions from "../../people.actions"

@Component({
  selector: 'app-create-people',
  templateUrl: './create-people.component.html',
  styleUrls: ['./create-people.component.scss']
})
export class CreatePeopleComponent implements OnInit {

  form: FormGroup;
  constructor(public store: Store<any>, private formBuilder: FormBuilder, private router: Router, public peopleSrvice: PeopleService) { }



  ngOnInit() {
    this.form = this.formBuilder.group({
      firstName: ["", Validators.required],
      secondName: ["", Validators.required],
      age: ["", Validators.required],
      img: "",
      adress: ""
    });
  }
  create() {
    // console.log(this.form.value)
    this.store.dispatch(PeopleActions.createPeopleStart({ people: this.form.value }))
    //this.peopleSrvice.createPeople(this.form.value)
    this.router.navigate(['/people/people']);
  }

  resetForm() {
    this.form.reset()
  }

}
