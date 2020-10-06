import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public data = {
    login: {
      icon: "login",
      text: "SignIn"
    },
    register: {
      icon: "person_add",
      text: "SignUp"
    },
    signOut: {
      icon: "exit_to_app",
      text: "LogOut"
    }
  }
  constructor() {

  }
  public login() {
    return this.data.login;
  }

  public register() {
    return this.data.register;
  }

  public signOut() {
    return this.data.signOut;
  }
}
