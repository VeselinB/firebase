



import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-edit-data',
  templateUrl: './edit-data.component.html',
  styleUrls: ['./edit-data.component.scss']
})
export class EditDataComponent implements OnInit {
  dialogTitle = "Edit User info";
  displayName: string;
  phoneNumber: string;
  photoURL: string;

  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditDataComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {

  }

  ngOnInit() {
    this.form = this.formBuilder.group({


      displayName: this.data.displayName,
      phoneNumber: this.data.photoURL,
      photoURL: this.data.photoURL,

    });


  }
  close(): void {
    this.dialogRef.close({ data: false });
  }

  save() {



    this.dialogRef.close({ ...this.form.value });





  }
}
