import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavController, NavParams } from '@ionic/angular';
import { UserdbService } from '../shared/userdb.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  profRef;
  constructor(
    private router: Router,
    public usrSvc: UserdbService,
    private navParams: NavParams,
    public navControl: NavController,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.usrSvc.getUserList();
  }

  disEditProfile() {
    this.modalCtrl.dismiss({
      'dismissed':true
    });
  }

  updateProfile( name, cc, phone, address) {
    this.profRef['name'] = name.value;
    this.profRef['cc'] = cc.value;
    this.profRef['phone'] = phone.value;
    this.profRef['address'] = address.value;
    console.log(this.profRef);
    console.log("Success Input Data [Edit Profile]");
    this.usrSvc.updateUser(this.profRef['uid'], this.profRef, 1)
      .then(() => {
        this.router.navigate(['/profile']);
      }).catch(err => console.log(err));
  }

  refreshInput() {

  }
}
