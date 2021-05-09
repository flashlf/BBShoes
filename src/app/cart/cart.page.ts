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
        console.log("Isi Cart =>", this.currentCart);
        let items = Object.keys(a['productList'])
        console.log("items => {{items}}")
        console.log(`values => ${Object.values(a['productList'])}`)
        this.Products.forEach(element => {
          let x = 0
          items.forEach(item => {
            if (element.$key == item) {
              //console.log(a['productList'][item]['productImage'])
              let temp = {
                productKey: a['productList'][item]['productKey'],
                productName: a['productList'][item]['productName'],
                productImage: a['productList'][item]['productImage'],
                productPrice: a['productList'][item]['productPrice'],
                productQty: a['productList'][item]['productQty'],
                productStatus: a['productList'][item]['productStatus']
              }
              this.cartProduct.push(temp)
              x++
            }
          });
        });
        console.log('PRODUCT DI FILTER');
        console.log(this.cartProduct)
      })
    }
  }
  ionViewDidEnter() {
    if(this.cartProduct == null || this.cartProduct == undefined) {
      console.log("Belum Ada product boy, silahkan beli dulu.")
    }
  }

  changeQty(){
    if (window.confirm('Ubah Item'))
      console.log("hulahah");
  }

  deleteProduct(id : string) {
    console.log('Product Key => ',id)
    let x = 0
    this.cartProduct.forEach(element => {
       if (element.productKey == id ) {
         let remove = this.cartProduct.splice(x,1)
         console.log("Product yg sudah dihapus", remove)
         console.log(`cart-${this.uid}`)
         this.cartSvc.removeFromCart(`cart-${this.uid}`, remove)
        }
        x++
      });
      console.log("Cart yg baru", this.cartProduct)
  }

  async getDataStorage(): Promise<void> {
    this.uid = await this.storage.get('uid').then( val=> {return val})
    this.email = await this.storage.get('email').then(val=>{return val})
  }
}
