import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditarUsuarioPage } from './editar-usuario';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    EditarUsuarioPage,
  ],
  imports: [
    IonicPageModule.forChild(EditarUsuarioPage),
    TranslateModule
  ],
})
export class EditarUsuarioPageModule {}
