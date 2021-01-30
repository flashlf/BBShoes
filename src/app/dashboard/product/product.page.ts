import { Component, OnInit } from '@angular/core';
import { Product as prod } from 'src/app/shared/Product';
import { ProductService } from 'src/app/shared/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {
  hidden : boolean;
  Products = [];

  constructor(
    private prodSvc : ProductService
  ) {
    this.hidden = true;
  }

  ngOnInit() {
    this.fetchProducts();
    let productRes = this.prodSvc.getProductList();
    productRes.snapshotChanges().subscribe(res => {
      // hapus isi klo ada perubahan
      this.Products = [];
      res.forEach(item => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        this.Products.push(a as prod);
      })
    })
  }

  public showSearch(): void{
    console.log("Search dipencet")
    this.hidden = true ? !this.hidden : !this.hidden;
  }

  fetchProducts() {
    this.prodSvc.getProductList().valueChanges().subscribe(res => {
      console.log(res)
    })
  }

  deleteProducts(id) {
    console.log(id)
    if (window.confirm('Yakin ingin menghapus produk ini?'))
      this.prodSvc.deleteProduct(id);
  }
}
