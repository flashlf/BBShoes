import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { DetailProductPage } from '../detail-product/detail-product.page';
import { CartService } from '../shared/cart.service';
import { Product } from '../shared/Product';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {
  items = [
    {
      name : 'Nike Metcon 6 FlyEase',
      brand : "Nike",
      category : "Training Shoe",
      description : "The most breathable Metcon version yet, the Nike Metcon 6 FlyEase helps keep your foot cool when you\'re going full steam. Designed to stand up to the push and pull of heavily weighted and high-intensity workouts, it features a step-in entry with laces you only have to tie once.",
      image : "https://static.nike.com/a/images/t_PDP_640_v1/f_auto,b_rgb:f5f5f5/61a71950-599f-4b95-b532-ea651e36a4e7/metcon-6-flyease-training-shoe-qSW3lg.jpg",
      balance : 1979000
    },
    {
      name : 'Zoom Freak 2',
      brand : "Nike",
      category : 'Basketball Shoe',
      description : "The most breathable Metcon version yet, the Nike Metcon 6 FlyEase helps keep your foot cool when you\'re going full steam. Designed to stand up to the push and pull of heavily weighted and high-intensity workouts, it features a step-in entry with laces you only have to tie once.",
      image : "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,b_rgb:f5f5f5/f639d9b2-8072-4a37-b9d4-edf395f5b9c7/zoom-freak-2-basketball-shoe-kgljjf.jpg",
      balance : 1799000
    },
    {
      name : "Kyrie 7 EP 'Sisterhood'",
      brand : "Nike",
      category : 'Basketball Shoe',
      description : "Kyrie made headlines with his generous, outspoken support of female ballers. Nike is joining him with the special 'Sisterhood' colourway of the Kyrie 7 EP, which aims to empower and unify support for women athletes everywhere. The eye-grabbing aesthetic is highlighted by a detailed floral graphic underneath the pop of its yellow-outlined Swoosh logo. On or off the court, show your support for women athletes in style. This EP version uses an extra-durable outsole that's ideal for outdoor courts.",
      image : "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/0c98d012-7599-4347-b069-0a7922bb814e/kyrie-7-ep-sisterhood-basketball-shoe-8ZrrMn.jpg",
      balance : 1979000
    },
    {
      name : "Nike Air Max 1",
      brand : "Nike",
      category : 'Regular',
      description : "The Nike Air Max 1 reboots the legendary design that has reigned supreme since 1987. Crossing street fashion with sport, it takes the same lightweight cushioning and classic silhouette of the OG and boldly reworks it with salvaged materials, fresh colours and exposed stitching.",
      image : "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/75b7368c-8873-4662-9f89-157bd2cfb97f/air-max-1-shoe-SS9rJG.jpg",
      balance : 2099000
    }
  ];
  Products = [];
  uid: string; 
  email: string;
  hidden : boolean;
  iconName : String;
  constructor(
    public modalCtrl : ModalController,
    private routerOutlet: IonRouterOutlet,
    private prodSvc: ProductService,
    private router: Router,
    private storage: Storage,
    private cart: CartService) { 
    
  }

  ngOnInit() {
    this.getDataStorage().then(() => {
      if(this.uid == null || this.uid == undefined)
      //this.redirect();        
      console.log("Belom Login brur");
    })
    this.hidden = true;
    this.iconName = "filter-circle-outline";
    // Ambil Product
    this.fetchProducts();
    let productRes = this.prodSvc.getProductList();
    productRes.snapshotChanges().subscribe(res => {
      this.Products = [];
      res.forEach(item => {
        let a = item.payload.toJSON();
        console.log(item);
        a['$key'] = item.key;
        this.Products.push(a as Product);
      })
    })
  }
  AddCart(selectedProduct){
    if (window.confirm("Tambahkan item "+selectedProduct.name+" ke keranjang?"))
      console.log("Tambah ke keranjang id : ",selectedProduct.$key);
    let convProduct = {
      productKey: selectedProduct.$key,
      productName: selectedProduct.name,
      productImage: selectedProduct.imgURL,
      productPrice: selectedProduct.price,
      productQty: 1,
      productStatus: 1 
    }
    this.cart.addToCart("cart-"+this.uid, convProduct);
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

  async OpenModal(product){
    const modal = await this.modalCtrl.create({
      component : DetailProductPage,
      cssClass : 'my-custom-class',
      animated : true,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
      componentProps: {selectedProduct: product}
    });
    return await modal.present();
  }
  openCart(){
    this.router.navigate(['cart']);
  }
  fetchProducts() {
    this.prodSvc.getProductList().valueChanges().subscribe(res=>{
      console.log(res);
    })
  }

  async getDataStorage(): Promise<void> {
    this.uid = await this.storage.get('uid').then(val => {return val});
    this.email = await this.storage.get("email").then(val => {return val});
  }
}
