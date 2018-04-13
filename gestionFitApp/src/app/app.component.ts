import { Component ,ViewChild} from '@angular/core';
import { Platform,Nav,MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from '@ngx-translate/core';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = 'login';
  @ViewChild(Nav) nav: Nav;
  public isBrowser:boolean = false;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,public menuCtrl: MenuController, private translateService: TranslateService) {
    platform.ready().then(() => {
      this.translateService.setDefaultLang('es');
      this.translateService.use('es');
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

  isStudent(){
    return localStorage.getItem("user_role") != null && localStorage.getItem("user_role") == "Student";
  }

  isInstructor(){
    return localStorage.getItem("user_role") != null && localStorage.getItem("user_role") == "Instructor";
  }

  changeLang(lang){
    this.translateService.use(lang);
  }

}

