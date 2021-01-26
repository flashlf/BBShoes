import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Camera } from '@ionic-native/camera/ngx';


@Component({
  selector: 'app-action-product',
  templateUrl: './action-product.page.html',
  styleUrls: ['./action-product.page.scss'],
})
export class ActionProductPage implements OnInit {
  productForm: FormGroup;
  imgURL: String;

  constructor(
    private router: Router,
    public fBuild: FormBuilder,
    private camera: Camera
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

  getCamera() {
    this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.CAMERA,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      quality: 100
    }).then((res) => {
      this.imgURL = 'data:image/jpeg;base64,'+res;
    }).catch(e => {
      console.log(e)
    })
  }

  getGallery() {
    this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }).then((res) => {
      this.imgURL = res;
    }).catch(e => {
      console.log(e)
    })
  }
}
