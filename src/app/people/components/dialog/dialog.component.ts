
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  dialogTitle = "Create new user";
  user: string;
  email: string;
  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
    if (this.data.edit == true) {
      this.dialogTitle = "Edit user info";
    }

  }

  ngOnInit() {
    this.form = this.formBuilder.group({

      firstName: [this.data.firstName, Validators.required],
      secondName: [this.data.secondName, Validators.required],
      age: [this.data.age, Validators.required],
      img: this.data.img,
      adress: this.data.adress
    });


  }
  close(): void {
    this.dialogRef.close({ data: false });
  }

  save() {



    this.dialogRef.close({ ...this.form.value, id: this.data.id, ownerId: this.data.ownerId });





  }
}
