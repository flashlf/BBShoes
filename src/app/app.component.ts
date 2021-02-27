import { Component, OnDestroy, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthGuard } from './guards/auth.guard';
import { ServiceService } from './services/service.service';
import { UserdbService } from './shared/userdb.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public path: boolean = false;
  closed$ = new Subject<any>();
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public authSvc: UserdbService,
    public route: ActivatedRoute,
    public router: Router,
    public storage: Storage
  ) {
    this.initializeApp();
  }
  ngOnInit() {
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      takeUntil(this.closed$)
    ).subscribe(event => {
      if (event['url'] == 'login' || event['url'] == '') {
        this.path = false; // <-- hide tabs on specific pages
      } else {
        this.path = true;
      }
    });
  }
  IonViewWillEnter() {
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      takeUntil(this.closed$)
    ).subscribe(event => {
      if (event['url'] == 'login' || event['url'] == '') {
        this.path = false; // <-- hide tabs on specific pages
      } else {
        this.path = true;
      }
    });
  }
  ngOnDestroy() {
    this.closed$.next();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.storage.ready();
      this.statusBar.styleDefault();      
      this.splashScreen.hide();
    });
  }
  openProfile(){
    this.router.navigateByUrl('/profile');
  }
}
