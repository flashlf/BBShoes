import { Component, OnInit } from '@angular/core';
import { snapshotChanges } from '@angular/fire/database';
import { MenuController, ModalController, IonRouterOutlet, NavController } from '@ionic/angular';
import { of } from 'rxjs';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { ServiceService } from '../services/service.service';
import { UserdbService } from '../shared/userdb.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  User = [];
  userData : any;
  snapshot : any;
  uid : string;
  constructor(
    private menu: MenuController,
    private modalCtrl: ModalController,
    private authSvc: ServiceService,
    private routerOutlet: IonRouterOutlet,
    private navControl: NavController,
    private usrSvc: UserdbService) { }

  ngOnInit() {
    console.log(this.authSvc.user$)
    
  }
  ionViewDidEnter() {
    console.log("im called");
    this.authSvc.user$.subscribe(res => {
      this.uid = res.uid;
    })
  }
  emailDetail(){
    console.log(this.uid);
    let userRes = this.usrSvc.getUserList();
    userRes.query.equalTo(this.uid).once("value", this.snapshot);
    if (this.snapshot === null || this.snapshot === undefined) {
      this.userData = {
        $uid : this.uid,
        phone: 0,
        address: "",
        cc: 0,
        photoURL: "",
        role: 1
      }
      this.usrSvc.createUser(this.userData).then(res => {
        console.log("BERHASIL CUK");
        console.log(res);
      }).catch(err => console.log(err))
    } else console.log("ada BUNG")
  }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  async editProfile() {
    console.log("Edit Profile Clicked");
    const modal = await this.modalCtrl.create({
      component : EditProfileComponent,
      cssClass : 'my-custom-class',
      animated : true,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl
    });
    return await modal.present();
  }

  logout() {
    this.authSvc.logout();
    this.navControl.pop();
  }
}
