import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Storage } from '@ionic/storage';
import { Cart } from './Cart';
import { Product } from './Product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartListRef: AngularFireList<any>;
  cartRef: AngularFireObject<Cart>;

  public currentCart: any = null;
  constructor(
    private db: AngularFireDatabase,
    public storage: Storage
  ) { }

  createCart(cart: Cart) {
    let temp = {
      userRef : cart.cartID, 
      productList : cart.productList
    }

    return this.db.list('/cart/').set(cart.cartID, temp);
  }
  getCart(id: String) {
    return this.cartRef = this.db.object('/cart/'+id);
  }
  getCartList() {
    return this.cartListRef = this.db.list('/cart/');
  }
  getProductFromCart(id: string) :any{
    let item = this.db.object('/cart/'+id+'/productList');
    item.valueChanges().subscribe(product => {
      return product;
    })
  }
  addToCart(id : string, product: any) {
    let temp = this.getProductFromCart(id);
    temp.push(product.key, product.qty, product.imgURL, 1);
    return this.cartListRef.update(id, {
      cartID: id,
      productList: temp
    })
  }

  removeFromCart(id: string, product: any) {
    let temp = this.getProductFromCart(id);
    delete temp[product.key];
    return this.cartListRef.update(id, {
      cartID: id,
      productList: temp
    })
  }
}
