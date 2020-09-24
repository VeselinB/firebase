import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/service/firebase.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { of } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  isActive = false;
  constructor(private formBuilder: FormBuilder, public authService: FirebaseService, private router: Router) { }
  error = null;
  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      confirmPassword: ["", Validators.required,],
      name: "",
      phoneNumber: "",
      photoUrl: "",

    }, { validator: this.passwordErrorValidator });


  }

  showPass() {
    this.isActive = !this.isActive;
  }

  passwordErrorValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const password = control.get('password');
    const repeatPassword = control.get('confirmPassword');
    if (password.value != repeatPassword.value) {
      this.error = "Password fields must match!"
    } else {
      this.error = null;
    }
    return password.value != repeatPassword.value ? { 'passwordError': true } : null;
  };

  checkLenght() {
    const pass = this.form.get("password").value
    if (pass.length < 6) {
      this.error = "Password must contain minimum 6 symbols"
      console.log(pass)
    }
  }


  signUp() {
    this.authService.signUp(this.form.get("email").value, this.form.get("password").value).then(res => {

      this.authService.updateUserData({ displayName: this.form.get("name").value, phoneNumber: this.form.get("phoneNumber").value, photoURL: this.form.get("photoUrl").value }).then(res1 => {
        this.error = null;
        localStorage.setItem("user", JSON.stringify(res.user))
        this.router.navigate(['/people/people']);
      })

    }).catch(err => {
      console.log(err)
      this.error = err;
    })

  }
}
