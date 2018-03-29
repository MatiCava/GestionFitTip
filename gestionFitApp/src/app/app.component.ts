import { Component ,ViewChild} from '@angular/core';
import { Platform,Nav,MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;
  @ViewChild(Nav) nav: Nav;
  public isBrowser:boolean = false;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,public menuCtrl: MenuController) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
    if(platform.is('core')){
      this.isBrowser=true;
    }
  }

  openPage(page){
    this.menuCtrl.close();
    this.nav.push(page);
  }

  home(){
    this.nav.popToRoot();
  }


}

