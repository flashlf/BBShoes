import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonRouterOutlet } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Cart } from '../shared/Cart';
import { CartService } from '../shared/cart.service';
import { Product } from '../shared/Product';
import { ProductService } from '../shared/product.service';
import { UserdbService } from '../shared/userdb.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  uid: string;
  email: string;
  currentCart: any;
  cartProduct = [];
  Products = [];
  constructor(
    private routerOutlet: IonRouterOutlet,
    private router: Router,
    private usrSvc: UserdbService,
    private storage: Storage,
    private cartSvc: CartService,
    private prodSvc: ProductService
  ) {
    this.getDataStorage().then(
      () => {
        if (this.uid === null || this.uid === undefined) {
          this.routerOutlet.pop()
          this.router.navigate['/login']
        } else {
          console.log(`Udah login UID : ${this.uid}`)
        }
      }
    );
    // Get All product
    let productRes = this.prodSvc.getProductList();
    productRes.snapshotChanges().subscribe(res => {
      this.Products = [];
      res.forEach(item => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        this.Products.push(a as Product);
      })
    })
    console.log(this.Products);
  }

  ngOnInit() {
    
  }
  ionViewWillEnter() {
    if(this.uid != null && this.uid != undefined) {
      let cartRes = this.cartSvc.getCart(`cart-${this.uid}`)
      cartRes.snapshotChanges().subscribe(res => {
        let a = res.payload.toJSON();
        console.log(a['productList']);
        this.currentCart = [];
        this.cartProduct = [];
        console.log("ION VIEW WILL ENTER")
        this.currentCart.push(a as Cart);
        console.log(this.currentCart);
        let items = Object.keys(a['productList'])
        this.Products.forEach(element => {
          items.forEach(item => {
            if (element.$key == item)
              this.cartProduct.push(element as Product)
          });
        });
        console.log('PRODUCT DI FILTER');
        console.log(this.cartProduct)
      })
    }
  }
  ionViewDidEnter() {

  }

  changeQty(){
    if (window.confirm('Ubah Item'))
      console.log("hulahah");
  }

  async getDataStorage(): Promise<void> {
    this.uid = await this.storage.get('uid').then( val=> {return val})
    this.email = await this.storage.get('email').then(val=>{return val})
  }
}
