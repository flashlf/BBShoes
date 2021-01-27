import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Product } from './Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productListRef: AngularFireList<any>;
  productRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) { }

  //Create
  createProduct(prod: Product) {
    this.productListRef = this.db.list('/product');
    return this.productListRef.push({
      name: prod.name,
      brand: prod.brand,
      price: prod.price,
      desc: prod.desc,
      stock: prod.stock,
      imgURL: prod.imgURL
    })
  }

  //Get Single 
  getProduct(id: string) {
    this.productRef = this.db.object('/product/'+id);
    return this.productRef;
  }

  //Get List
  getProductList() {
    this.productListRef = this.db.list('/product/');
    return this.productListRef;
  }

  //Update
  updateProduct(id, prod: Product) {
    return this.productListRef.push({
      name: prod.name,
      brand: prod.brand,
      price: prod.price,
      desc: prod.desc,
      stock: prod.stock,
      imgURL: prod.imgURL
    })
  }

  deleteProduct(id: string) {
    this.productRef = this.db.object('/product/'+id);
    this.productRef.remove();
  }
}
