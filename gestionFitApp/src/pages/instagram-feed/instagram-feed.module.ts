import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InstagramFeedPage } from './instagram-feed';

@NgModule({
  declarations: [
    InstagramFeedPage,
  ],
  imports: [
    IonicPageModule.forChild(InstagramFeedPage),
  ],
})
export class InstagramFeedPageModule {}
