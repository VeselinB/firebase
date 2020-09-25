import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/service/firebase.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isActive = false;
  form: FormGroup;
  constructor(private formBuilder: FormBuilder, public authService: FirebaseService, private router: Router) { }
  error = null;
  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],

    });
  }
  showPass() {
    this.isActive = !this.isActive;
  }

  getUserData() {
    let userData;
    this.authService.getUserData().then(res => {
      if (res != null) {
        console.log(res.providerData[0])
      }

    })
  }
  test() {
    this.authService.loginViaGoogle()
  }
  signIn() {
    this.authService.signIn(this.form.get("email").value, this.form.get("password").value).then((res) => {
      // console.log(res)
      this.error = null;
      this.router.navigate(['/people/people']);
      // this.peopleService.getAllPeople();
      this.authService.getEmail();
      this.authService.getPhotoUrl();
    }).catch((err) => { this.error = err })


  }
}
