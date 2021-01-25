import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-action-product',
  templateUrl: './action-product.page.html',
  styleUrls: ['./action-product.page.scss'],
})
export class ActionProductPage implements OnInit {
  productForm: FormGroup;

  constructor(
    private router: Router,
    public fBuild: FormBuilder
  ) { }

  ngOnInit() {
    this.productForm = this.fBuild.group({
      name : [''],
      brand : [''],
      price : [''],
      desc : ['']
    })
  }

  addProduct() {
    if(!this.productForm.valid) {
      return false;
    } else {
      console.log("Success");
    }
  }
}
