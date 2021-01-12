import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(
    private modalCtrl:ModalController,
    private authSvc: ServiceService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  async onRegister(email, password) {
    try {
      const user = await this.authSvc.register(email.value, password.value);
      if(user) {
        console.log('User ->', user);
        const isVerified = this.authSvc.isEmailVerified(user);
        this.redirectUser(isVerified);
        // CheckEmail

      }
    } catch (error) {
      console.log('Error', error)
    }
    // console.log('Email ', email);
    // console.log('Password ', password);
  }

  redirectUser(isVerified: boolean) { //nanti param ganti jadi user buat cek rolenya.
    // Redirect -> admin kek mana kek
    if(true){
      this.router.navigate(['profile']);
    } else {
      //manakek
    }

  }

  public closeModal(){
    this.modalCtrl.dismiss({
      'dismissed':true
    });
  }
}
