import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Camera } from '@ionic-native/camera/ngx';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { ProductService } from 'src/app/shared/product.service';

interface imgData {
  name: string;
  filepath: string;
  size: number;
}

@Component({
  selector: 'app-action-product',
  templateUrl: './action-product.page.html',
  styleUrls: ['./action-product.page.scss'],
})
export class ActionProductPage implements OnInit {
  productForm: FormGroup;
  imgURL: String;
  uploadedFileURL: Observable<any>;
  task: AngularFireUploadTask;
  snapshot: Observable<any>;
  images: Observable<imgData[]>
  fileName: string;
  fileSize: number;
  private imageCollection: AngularFirestoreCollection<imgData>;
  constructor(
    private router: Router,
    public fBuild: FormBuilder,
    private storage: AngularFireStorage,
    private database: AngularFirestore,
    private prodSvc: ProductService,
    private camera: Camera
  ) {
    this.imageCollection = database.collection<imgData>('product');
    this.images = this.imageCollection.valueChanges();
   }

  ngOnInit() {
    this.productForm = this.fBuild.group({
      name : [''],
      brand : [''],
      price : [''],
      stock: [''],
      desc : [''],
      imgURL: ['']
    })
  }

  addProduct() {
    if(!this.productForm.valid) {
      return false;
    } else {
      console.log("Success");
      this.prodSvc.createProduct(this.productForm.value).then(res => {
        console.log(res)
        this.productForm.reset();
        this.router.navigate(['/dashboard/product/']);
      }).catch(error => console.log(error))
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

  uploadFile(event: FileList) {
    const file = event.item(0);
    console.log(file.name);
    this.imgURL = event.item(0).toString();
    if(file.type.split('/')[0] !== 'image') {
      console.error('unsupported file type :X')
      return;
    }
    this.fileName = file.name;

    const path = `product/${new Date().getTime()}_${file.name}`;
    const customMetadata = {app: "BBShoes img Product"};

    const fileRef = this.storage.ref(path);    
    
    this.task = this.storage.upload(path, file, {customMetadata});
    const downloadURL = fileRef.getDownloadURL();  
    this.snapshot = this.task.snapshotChanges().pipe(
      finalize(() => {
        // Get uploaded file storage path
        this.uploadedFileURL = fileRef.getDownloadURL();        
        this.uploadedFileURL.subscribe(resp=>{
          this.imgURL = resp.downloadURL;
          console.log("URL : "+resp.downloadURL);
        },error=>{
          console.error(error);
        })
      }),
      tap(snap => {
          this.fileSize = snap.totalBytes;
      })
    )
    this.task.then(snap=> {
      snap.ref.getDownloadURL().then(url => {
        this.imgURL = url;
      })
    })
    console.log("URL : "+this.imgURL);
  }

}
