import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/service/firebase.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  constructor(private formBuilder: FormBuilder, public authService: FirebaseService, private router: Router) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],

    });
  }
  signIn() {
    this.authService.signIn(this.form.get("email").value, this.form.get("password").value).then((res) => {
      // console.log(res)
      this.router.navigate(['/people/people']);
      // this.peopleService.getAllPeople();
      this.authService.getEmail();
    })


  }
}
