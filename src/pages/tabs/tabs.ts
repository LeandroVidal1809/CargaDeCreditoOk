import { Component } from '@angular/core';

import { EscanearPage } from '../Escanear/Escanear';
import { MiCreditoPage } from '../mi-credito/mi-credito';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root =EscanearPage;
  tab2Root = MiCreditoPage;
  tab3Root =  HomePage;

  constructor() {

  }
}
