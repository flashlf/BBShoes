import { analyzeFileForInjectables } from '@angular/compiler';
import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  // Properti Class
  text = "Default starting text"; // Contoh Penulisan Variable
  constructor(public toastControl: ToastController) {}

  /**
   * Method onChangeText() untuk kemudian dipanggil
   * pada home.page.html button yg dimuat method ini.
   */
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
