import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import { AlertController,LoadingController,Loading } from 'ionic-angular';
/**
 * Generated class for the MiCreditoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mi-credito',
  templateUrl: 'mi-credito.html',
})
export class MiCreditoPage {
usuario:string;
valor:number;
fecha:Date;
miArray : Array<any>;
habiliar:boolean;
db2:AngularFireDatabase
listUsuarioCarga: FirebaseListObservable<any>;
  constructor(public navCtrl: NavController,db:AngularFireDatabase, public navParams: NavParams,
    public spinner:LoadingController) {
    this.usuario=navParams.get("usuario");
   this.db2=db;   
      this.habiliar=true;
  
  }
  acumula()
  {
    let suma:number=0;
    
    this.listUsuarioCarga=this.db2.list('/UsuarioCredito');
    this.miArray=new Array<any>();
    let mispinner =  this.SpinnerStart();
    mispinner.present();

    this.listUsuarioCarga.subscribe(items => {
      items.forEach(x=>{
        if(this.usuario==x.usuario)
          {
            suma=suma+x.valor;
            this.miArray.push(x);
      }    
      });
});
this.valor=suma;
mispinner.dismiss();

  }

  habilita()
  {
    if(this.habiliar==true)
      {
        this.habiliar=false;
      }
      else
        {this.habiliar=true;}
  }
  SpinnerStart():Loading
  {
    let loader= this.spinner.create({

      duration: 30000,
      content:"Ingresando"
    })
    return loader;
  
  }
  ionViewWillEnter(){
    this.acumula();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MiCred  itoPage');
  }

}
