import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Storage } from '@ionic/storage';
import { Cart } from './Cart';

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
    return this.cartListRef.push({
      userRef : cart.cartID, 
      productList : cart.productList
    })
  }
}
