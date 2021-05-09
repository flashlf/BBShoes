import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Storage } from '@ionic/storage';
import { Cart } from './Cart';
import { Product } from './Product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cartListRef: AngularFireList<any>;
  public cartRef: AngularFireObject<any>;

  public currentCart: any = null;
  constructor(
    private db: AngularFireDatabase,
    public storage: Storage
  ) { 
    this.cartListRef = this.getCartList()
  }

  createCart(userID: String) {
    let temp = {
      cartID : "cart-"+userID, 
      productList : [null]
    }

    return this.db.list('/cart/').set(temp.cartID, temp);
  }
  getCart(id: string) {
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
    this.cartRef = this.getCart(id);
    let productListRef = this.getProductFromCart(id);
    if(productListRef != undefined) {
      productListRef.push(product);
      return this.cartListRef.update(id, {
        cartID: id,
        productList: productListRef
      })
    } else {
      let temp = {
        productKey: product.productKey,
        productName: product.productName,
        productImage: product.productImage,
        productPrice: product.productPrice,
        productQty: 1,
        productStatus: 1  
      }
      console.log(temp)
      // ini bisa di enhance untuk penambahan qty apabila product udah ada dalam cart
      // tinggal dimasukin dulu db.objectnya set di bagian terakhir aja
      return this.db.object('/cart/'+id+'/productList/'+temp.productKey).set(temp);
    }
  }

  removeFromCart(id: string, product: any) {
    console.log('JSON yg dihapus => /cart/'+id+'/productList/'+product[0]['productKey'])
    this.cartRef = this.db.object('/cart/'+id+'/productList/'+product[0]['productKey'])
    this.cartRef.remove();
  }
}
