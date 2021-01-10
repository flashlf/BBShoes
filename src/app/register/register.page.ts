import { Component, OnInit } from '@angular/core';
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
    private authSvc: ServiceService
  ) { }

  ngOnInit() {
  }

  async onRegister(email, password) {
    try {
      const user = await this.authSvc.register(email.value, password.value);
      if(user) {
        console.log('User ->', user);
        // CheckEmail

      }
    } catch (error) {
      console.log('Error', error)
    }
    // console.log('Email ', email);
    // console.log('Password ', password);
  }

  public closeModal(){
    this.modalCtrl.dismiss({
      'dismissed':true
    });
  }
}
