import { Component, OnInit } from '@angular/core';
import { snapshotChanges } from '@angular/fire/database';
import { Router } from '@angular/router';
import { MenuController, ModalController, IonRouterOutlet, NavController } from '@ionic/angular';
import { of } from 'rxjs';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { AuthGuard } from '../guards/auth.guard';
import { ServiceService } from '../services/service.service';
import { Product } from '../shared/Product';
import { UserdbService } from '../shared/userdb.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  userData : any;
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
    private navControl: NavController,
    private usrSvc: UserdbService) { }

  ngOnInit() {
    this.redirect();
    console.log(this.authSvc.user$)
    if(this.userData == undefined && this.userData == null) {
      this.authSvc.user$.subscribe(res => {
        this.uid = res.uid;
        let userRes = this.usrSvc.getUser(this.uid);
        userRes.valueChanges().subscribe(p => {
          if(p === null || p === undefined) {
            this.userData = {
              $uid : this.uid,
              name : res.displayName,
              phone: 0,
              address: "",
              cc: 0,
              photoURL: "",
              role: 1
            }
            this.usrSvc.createUserPreID(this.userData, this.uid).then(res => {
              console.log("Uid ini baru saja didaftarkan");
              console.log(res);
            }).catch(err => console.log(err))
          } else {
            this.userData = {
              uid : p.uid,
              name : p.name,
              phone: p.phone,
              address: p.address,
              cc: p.cc,
              photoURL: p.photoURL,
              role: p.role,
            }
            this.email = res.email;
            if(this.userData['role'] == 2)        
              this.admin = true;
            console.log("user ini sudah ada ->",this.userData);
            this.usrSvc.setCurrentUser(this.userData);
          }
        })    
      })
    }
  }
  ionViewDidEnter() {
    console.log("im called");
  }
  ngOnDestroy() {
    this.routerOutlet.deactivate();
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
    this.usrSvc.setCurrentUser(this.userData);
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
    this.authSvc.logout();
    this.usrSvc.setCurrentUser(null);
    this.router.navigate['/home'];
  }

  redirect() {
    if(this.authSvc.user$ === null){
      this.routerOutlet.pop();
      this.router.navigate(['/login']);
    }
  }
}
