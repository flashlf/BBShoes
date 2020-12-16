import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.page.html',
  styleUrls: ['./detail-product.page.scss'],
})
export class DetailProductPage implements OnInit {

  constructor(
    public navParams: NavParams,
    public modalCtrl: ModalController
  ) {}

  ngOnInit() {
  }

  public closeModal(){
    this.modalCtrl.dismiss({
      'dismissed':true
    });
  }
}
