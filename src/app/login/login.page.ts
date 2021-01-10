import { Component, OnInit } from '@angular/core';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { RegisterPage } from '../register/register.page';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  text = "Default starting text"; // Contoh Penulisan Variable

  constructor(
    private modalCtrl: ModalController,
    private routerOutlet: IonRouterOutlet,
    private authSvc: ServiceService
  ) { }

  ngOnInit() {
  }
  
  onChangeText() {
    if(this.text == "Changed") {
      this.text = "Its Already Changed FUCKER!";
    } else
      this.text = "Changed";
  }
  async login(email, password) {
    this.text = "You Clicked Login Button";
    try {
      const user = await this.authSvc.login(email.value, password.value);
      if(user) {
        // TODO : Check Email
        const isVerified = this.authSvc.isEmailVerified(user);
        console.log('Verified -> ', isVerified)
      }
    } catch (error) {
      console.log('Error', error)
    }
  }

  async onLoginGoogle() {
    try {
      const user = await this.authSvc.loginGoogle();
      if (user) {
        // TODO : Check Email
        console.log("User ->", user)
      }
    } catch (error) {
      console.log('Error', error)      
    }
  }

  async register() {
    this.text = "You Clicked Register Button";
    const modal = await this.modalCtrl.create({
      component : RegisterPage,
      cssClass : 'my-custom-class',
      animated : true,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl
    });
    return await modal.present();
  }
}
