import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  changeQty(){
    if (window.confirm('Ubah Item'))
      console.log("hulahah");
  }
}
