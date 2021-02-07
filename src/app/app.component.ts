import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthGuard } from './guards/auth.guard';
import { ServiceService } from './services/service.service';
import { UserdbService } from './shared/userdb.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  linkUser="/login";
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authSvc: UserdbService,
  ) {
    this.initializeApp();
    if(authSvc.getCurrentUser() !== null || authSvc.getCurrentUser() !== undefined) {
      this.linkUser = "/profile"
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
