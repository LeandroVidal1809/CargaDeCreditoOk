import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';

import { EscanearPage } from '../Escanear/Escanear';
import { MiCreditoPage } from '../mi-credito/mi-credito';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  usuario:string;
  tab1Root =EscanearPage;
  tab2Root = MiCreditoPage;
  tab3Root =  HomePage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.usuario=navParams.get("usuario");
    
    
    console.log(navParams); // returns NavParams {data: Object}
    this.usuario = navParams.data;
    
  }
}
