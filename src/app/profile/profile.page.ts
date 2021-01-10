import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController, IonRouterOutlet, NavController } from '@ionic/angular';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(
    private menu: MenuController,
    private modalCtrl: ModalController,
    private routerOutlet: IonRouterOutlet,
    private navControl: NavController) { }

  ngOnInit() {
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
    this.navControl.pop();
  }
}
