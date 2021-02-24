import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ServiceService } from '../services/service.service';
import { UserdbService } from '../shared/userdb.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(
    private modalCtrl:ModalController,
    private authSvc: ServiceService,
    private usrSvc: UserdbService,
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
        // Buat user object di DB
        let tempUser = {
          uid : user.uid,
          name : user.displayName,
          phone: 0,
          address: "",
          cc: 0,
          photoURL: "https://www.flaticon.com/svg/static/icons/svg/3947/3947031.svg",
          role: 1
        }
        this.usrSvc.createUserPreID(tempUser, user.uid).then(
          res => {
            console.log("UID "+user.uid+", berhasil dibuat");
            console.log(res)
          }
        ).catch(err => console.log(err));
        // CheckEmail
        this.redirectUser(isVerified);
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
