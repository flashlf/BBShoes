import { analyzeFileForInjectables } from '@angular/compiler';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonRouterOutlet, ModalController, ToastController } from '@ionic/angular';
import { DetailProductPage } from '../detail-product/detail-product.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public modalCtrl: ModalController,
    private routerOutlet: IonRouterOutlet,
    private router: Router) {}

  async showModal(){
    const modal = await this.modalCtrl.create({
      component : DetailProductPage,
      cssClass : 'my-custom-class',
      animated : true,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl
    });
    console.log(modal);
    return await modal.present();
  }
  openProfile(){
    this.router.navigateByUrl('/profile');
  }
}
