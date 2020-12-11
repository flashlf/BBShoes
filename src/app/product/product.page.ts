import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {
  hidden : boolean;
  iconName : String;
  constructor() { 
    this.hidden = true;
    this.iconName = "filter-circle-outline";
  }

  ngOnInit() {
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
}
