import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  text = "Default starting text"; // Contoh Penulisan Variable

  constructor() { }

  ngOnInit() {
  }
  
  onChangeText() {
    if(this.text == "Changed") {
      this.text = "Its Already Changed FUCKER!";
    } else
      this.text = "Changed";
  }
  login() {
    this.text = "You Clicked Login Button";
  }
  register() {
    this.text = "You Clicked Register Button";
  }
}
