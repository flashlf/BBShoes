import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {
  hidden : boolean;
  constructor() {
    this.hidden = true;
  }

  ngOnInit() {
  }

  public showSearch(): void{
    console.log("Search dipencet")
    this.hidden = true ? !this.hidden : !this.hidden;
  }
}
