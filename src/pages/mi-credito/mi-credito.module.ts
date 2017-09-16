import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MiCreditoPage } from './mi-credito';

@NgModule({
  declarations: [
    MiCreditoPage,
  ],
  imports: [
    IonicPageModule.forChild(MiCreditoPage),
  ],
})
export class MiCreditoPageModule {}
