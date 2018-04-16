import { Component ,ViewChild, OnInit} from '@angular/core';
import { Platform,Nav,MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from '@ngx-translate/core';

@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit{
  rootPage:any = 'login';
  rootPageParams:any = {};
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

  ngOnInit(){
    if(this.logged()){
      if(this.isInstructor()){
        this.rootPage = "alumnos";
        this.rootPageParams = {id:Number(localStorage.getItem("id"))}
      }
      else if(this.isStudent()){
        this.rootPage = "dashboard";
        this.rootPageParams = {id:Number(localStorage.getItem("id"))}

      }
    }
    else{
      this.rootPage = "login";
    }
  }

  openPage(page){
    this.menuCtrl.close();
    this.nav.push(page);
  }

  logout(){
    this.menuCtrl.close().then(()=>
      {localStorage.removeItem("user_role");
    localStorage.removeItem("id");
    this.nav.push("login");}

      );
    

  }


  home(){
    this.menuCtrl.close();
    this.nav.popToRoot();
  }

  logged(){
    return localStorage.getItem("user_role") != null;
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

