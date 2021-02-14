import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.page.html',
  styleUrls: ['./detail-product.page.scss'],
})
export class DetailProductPage implements OnInit {
  selectedProduct;
  constructor(
    public navParams: NavParams,
    public modalCtrl: ModalController
  ) {}

  ngOnInit() {
    console.log("Data ->",this.selectedProduct)
  }

  public closeModal(){
    this.modalCtrl.dismiss({
      'dismissed':true
    });
  }

  addToCart() {
    console.log("item -> "+this.selectedProduct.$key+" masuk keranjang");
  }
}
