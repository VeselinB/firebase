
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { v4 as uuid } from 'uuid';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  dialogTitle = "Edit person";
  user: string;
  file;
  email: string;
  form: FormGroup;
  constructor(
    private storage: AngularFireStorage,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
    if (this.data.edit == true) {
      this.dialogTitle = "Edit user info";
    }

  }
  uploadFile(event) {
    this.file = event.target.files[0];
    // console.log(file)

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
    if (this.file == undefined) {
      this.dialogRef.close({ ...this.form.value, id: this.data.id, ownerId: this.data.ownerId });
    } else {
      const filePath = this.file.name;
      const ref = this.storage.ref(filePath);
      const task = ref.put(this.file).then(res => {
        res.ref.getDownloadURL().then(url => {
          console.log(url);
          this.form.value.img = url
          this.dialogRef.close({ ...this.form.value, id: this.data.id, ownerId: this.data.ownerId });
        })
      });
    }
  }
}
