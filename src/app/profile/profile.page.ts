import { Component, OnInit } from '@angular/core';
import { snapshotChanges } from '@angular/fire/database';
import { Router } from '@angular/router';
import { MenuController, ModalController, IonRouterOutlet, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { of } from 'rxjs';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { AuthGuard } from '../guards/auth.guard';
import { ServiceService } from '../services/service.service';
import { UserdbService } from '../shared/userdb.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  userData : any = {
    uid : "",
    name : "",
    phone: 0,
    address: "",
    cc: 0,
    photoURL: "",
    role: 1
  };
  admin : boolean = false;
  email : string;
  snapshot : any;
  uid : string;
  constructor(
    private menu: MenuController,
    private modalCtrl: ModalController,
    private authSvc: ServiceService,
    private authGuard: AuthGuard,
    private routerOutlet: IonRouterOutlet,
    private router: Router,
    private storage: Storage,
    private usrSvc: UserdbService) { }

  ngOnInit() {
    //this.redirect();        
  }

  ionViewWillEnter() {
    console.log("im called");
    this.getDataStorage().then(() =>{
      console.log("UID->",this.uid);
      if(this.uid !== null) {
        //this.authSvc.user$.subscribe(res => {
          this.usrSvc.getUserList();        
          let userRes = this.usrSvc.getUser(this.uid);
          userRes.valueChanges().subscribe(p => {
            // if(p === null || p === undefined) {
            //   this.userData = {
            //     uid : this.uid,
            //     name : "",
            //     phone: 0,
            //     address: "",
            //     cc: 0,
            //     photoURL: "https://www.flaticon.com/svg/static/icons/svg/3947/3947031.svg",
            //     role: 1
            //   }
            //   this.usrSvc.createUserPreID(this.userData, this.uid).then(res => {
            //     console.log("Uid ini baru saja didaftarkan");
            //     console.log(res);
            //   }).catch(err => console.log(err))
            //   this.usrSvc.setCurrentUser(this.userData);
            // } else {
              this.userData = {
                uid : p.uid,
                name : p.name,
                phone: p.phone,
                address: p.address,
                cc: p.cc,
                photoURL: p.photoURL,
                role: p.role
              };          
              (this.userData['role'] == 2) ? this.admin = true : this.admin = false;
              console.log("user ini sudah ada ->",this.userData);
              this.usrSvc.setCurrentUser(this.userData);
            // }
          })    
        //}).closed    
      }

    });

  }
  ngOnDestroy() {
    //this.userData = null;
  }
  emailDetail(){
    console.log(this.uid);
    // let userRes = this.usrSvc.getUser(this.uid);    
    // userRes.valueChanges().subscribe(p => {
    //   console.log("Isi Snapshot ->",p);
    // })
    // if (userRes === null || userRes === undefined) {
    //   this.userData = {
    //     $uid : this.uid,
    //     phone: 0,
    //     address: "",
    //     cc: 0,
    //     photoURL: "",
    //     role: 1
    //   }
      
    // } else {
    //   console.log(userRes)
    //   this.userData = {
    //     $uid : this.snapshot.uid,
    //     phone: this.snapshot.phone,
    //     address: this.snapshot.address,
    //     cc: this.snapshot.cc,
    //     photoURL: this.snapshot.photoURL,
    //     role: this.snapshot.role
    //   }
    //   console.log("isi UserData ", this.userData);
    // }
  }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  async editProfile() {
    console.log("Edit Profile Clicked");
    const modal = await this.modalCtrl.create({
      component : EditProfileComponent,
      cssClass : 'my-custom-class',
      animated : true,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
      componentProps: {profRef: this.userData}
    });
    return await modal.present();
  }

  logout() {
    this.router.navigate(['/login']);
    this.router.dispose();
    this.authSvc.logout();
    this.usrSvc.setCurrentUser(null);
    this.userData = null;
  }
  async getDataStorage(): Promise<void> {
    this.uid = await this.storage.get('uid').then(val => {return val});
    this.email = await this.storage.get("email").then(val => {return val});
  }

  doRefresh(event) {
    console.log('Begin async operation');
      this.getDataStorage().then(() => {
        console.log('Async operation has ended');
        event.target.complete();
      });

  }

  // redirect() {
  //   if(this.usrSvc.getCurrentUser() === null || this.usrSvc.getCurrentUser() === undefined){
  //     this.routerOutlet.pop();
  //     this.router.navigate(['/login']);
  //   }
  // }
}
