import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import moment from 'moment';
import { InstagramProvider } from '../../providers/instagram/instagram';



@IonicPage()
@Component({
  selector: 'instagram-feed',
  templateUrl: 'instagram-feed.html',
  providers: [InstagramProvider]
})
export class InstagramFeedPage implements OnInit{
  private media;
  private info;

  constructor(public navCtrl: NavController, public navParams: NavParams,private instagramServ : InstagramProvider) {
    this.media=[];
    this.info= {};
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InstagramFeedPage');
  }

  ngOnInit(){
    this.instagramServ.getInstagramUserInfo().subscribe(
      res=> {this.media=res.data;console.log(res)},
      error=> console.log(error)
      );

    this.instagramServ.getInstagramProfile().subscribe(
      res=> {this.info=res.data;console.log(res)},
      error=> console.log(error));

  }

  fecha(time){
    return new Date(time * 1000);
  }

  hace(fecha){
    return moment(fecha.toISOString().slice(0,10).replace(/-/g,""),"YYYYMMDD").fromNow();
  
  }

}
