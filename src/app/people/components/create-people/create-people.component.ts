import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PeopleService } from 'src/app/service/people.service';
import { Store } from '@ngrx/store';
import * as PeopleActions from "../../people.actions"
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AngularFireStorage } from '@angular/fire/storage';


@Component({
  selector: 'app-create-people',
  templateUrl: './create-people.component.html',
  styleUrls: ['./create-people.component.scss']
})
export class CreatePeopleComponent implements OnInit {
  dialogTitle = "Create person"
  form: FormGroup;
  file: any;
  constructor(private storage: AngularFireStorage, public store: Store<any>, private formBuilder: FormBuilder, private router: Router, public peopleSrvice: PeopleService, public dialogRef: MatDialogRef<CreatePeopleComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {

  }

  uploadFile(event) {
    this.file = event.target.files[0];
    // console.log(file)

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
    if (this.file == undefined) {
      this.dialogRef.close({ ...this.form.value, id: this.data.id, ownerId: this.data.ownerId });
    } else {
      const filePath = this.file.name;
      const ref = this.storage.ref(filePath);
      const task = ref.put(this.file).then(res => {
        res.ref.getDownloadURL().then(url => {
          console.log(url);
          this.form.value.img = url
          this.dialogRef.close({ people: this.form.value });
        })
      });
    }

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
