import { Component ,ViewChild, OnInit} from '@angular/core';
import { Platform,Nav,MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from '@ngx-translate/core';
import { Globalization } from '@ionic-native/globalization';


@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit{
  rootPage:any = 'login';
  rootPageParams:any = {};
  @ViewChild(Nav) nav: Nav;
  public isBrowser:boolean = false;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,public menuCtrl: MenuController, private translateService: TranslateService,private glob: Globalization) {
    platform.ready().then(() => {
      this.glob.getPreferredLanguage()
    .then(res => {if(res.value.includes("es")){this.translateService.setDefaultLang("es");
    this.translateService.use('es')}else{this.translateService.setDefaultLang("en");
    this.translateService.use('en')};})
    .catch(e => console.log(e));
      
      if(!platform.is("core")){
        statusBar.styleDefault();
        splashScreen.hide();
      }

    });
    if(platform.is('core')){
      this.isBrowser=true;
    }
  }

  ngOnInit(){
    if(this.logged()){


        this.rootPage = "dashboard";
        this.rootPageParams = {id:Number(localStorage.getItem("id"))}

      
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
      {localStorage.removeItem("token");
    localStorage.removeItem("id");
    this.nav.push("login");}

      );
    

  }


  home(){
    this.menuCtrl.close();
    this.nav.popToRoot();
  }

  logged(){
    return localStorage.getItem("token") != null;
  }

 

  changeLang(lang){
    this.translateService.use(lang);
  }

}

