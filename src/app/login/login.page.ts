import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { RegisterPage } from '../register/register.page';
import { ServiceService } from '../services/service.service';
import { Userdb } from '../shared/Userdb';
import { UserdbService } from '../shared/userdb.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  text = "Default starting text"; // Contoh Penulisan Variable
  user : any;
  constructor(
    private modalCtrl: ModalController,
    private routerOutlet: IonRouterOutlet,
    private router: Router,
    private authSvc: ServiceService,
    private usrSvc: UserdbService,
  ) {  }

  ngOnInit() { 
    if(this.usrSvc.getCurrentUser() != null) {
      this.router.navigate(['/profile']);
    }  
  }
  ionViewWillEnter() {
    
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
        
        this.redirectUser(isVerified);
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
        const isVerified = this.authSvc.isEmailVerified(user);

        this.redirectUser(isVerified);
        console.log("Verified ->", isVerified)
      }
    } catch (error) {
      console.log('Error', error)      
    }
  }

  redirectUser(isVerified: boolean) { //nanti param ganti jadi user buat cek rolenya.
    // Redirect -> admin kek mana kek
    if(true){
      this.router.navigate(['/profile']);
    } else {
      //manakek
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
