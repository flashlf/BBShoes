import { Component, OnInit } from '@angular/core';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { timeStamp } from 'console';
import { DetailProductPage } from '../detail-product/detail-product.page';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {
  accounts = [
    {
      name : 'Hussein Muhammad',
      balance : 1000
    },
    {
      name : 'Ahmad Rashid',
      balance : 1200
    }
  ];
  hidden : boolean;
  iconName : String;
  constructor(
    public modalCtrl : ModalController,
    private routerOutlet: IonRouterOutlet) { 
    
  }

  ngOnInit() {
    this.hidden = true;
    this.iconName = "filter-circle-outline";
  }

  public showSearch(): void{
    console.log("Search dipencet")
    if(this.hidden == true) {
      this.hidden = false;
    } else {
      this.hidden = true;
    }
  }
  public showFilter(): void {
    
    console.log("Filter dipencet")
    if(this.iconName == "filter-circle-outline") {
      this.iconName = "filter-circle-sharp";
    } else {
      this.iconName = "filter-circle-outline";
    }
  }

  async OpenModal(){
    const modal = await this.modalCtrl.create({
      component : DetailProductPage,
      cssClass : 'my-custom-class',
      animated : true,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl
    });
    return await modal.present();
  }
}
