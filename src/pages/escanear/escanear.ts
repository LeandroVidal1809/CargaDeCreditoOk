import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner ,BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import { AlertController,LoadingController,Loading } from 'ionic-angular';
/**
 * Generated class for the EscanearPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-escanear',
  templateUrl: 'escanear.html',
})
export class EscanearPage {
  scanData : {};
  encodeData : string ;
  encodedData : {} ;
  escaneado:string;
  existe:boolean;
  cargo:boolean;
  base:string;
  mensajeSaldo:string;
  saldo:number;
  fecha:string=Date.now().toString();
  usuario:string;
  options :BarcodeScannerOptions;
  listcodigos: FirebaseListObservable<any>;
  listUsuarioCarga: FirebaseListObservable<any>;
  constructor(public navCtrl: NavController,db:AngularFireDatabase,public alertCtrl: AlertController, public navParams: NavParams,private barcodeScanner: BarcodeScanner) {
    this.listcodigos=db.list('/codigos');
    this.listUsuarioCarga=db.list('/UsuarioCredito');
    this.usuario=navParams.get("usuario");
    this.scan();
  }


  showAlert(mensaje:string,titulo:string) {
    
    let alert = this.alertCtrl.create({
      title: titulo,
      subTitle: mensaje,
      buttons: ['OK']
    });
    alert.present();
  }  


  Cargar()
  {

    if(this.existe)
    {
     
       this.listUsuarioCarga.subscribe(items => {
            items.forEach(x=>{
            if(x.usuario==this.usuario && this.saldo==x.valor)
            {
             
              this.cargo=true;
            }
  
            });
    });
        if(this.cargo)
          {
            this.showAlert("Ya Cargo esta tarjeta","Error de carga");

          }
        else
         {
          var f = new Date();
          var fecha =  f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear();
          
              this.listUsuarioCarga.push({
                        usuario:this.usuario,
                        valor:this.saldo,
                        Fecha:fecha.toString()});
                        this.showAlert("Se cargo Exitosamente!","Felicidades!");              
                        this.mensajeSaldo="";
         }
    }
    else
      {
        this.showAlert("Este codigo no pertenece a una tarjeta valida","Error de carga");

      }

  }
  scan()
  {
   this.existe=false;
   this.cargo=false;
    
    this.options = { prompt : "Escanea tu Qr de Credito" }
    this.barcodeScanner.scan(this.options).then((barcodeData) =>
     {
        this.scanData=barcodeData;
         this.escaneado=barcodeData.text;

         this.listcodigos.subscribe(items => 
          {
            items.forEach(item =>
             {

              if(this.escaneado==item.codigo)
              {
                this.saldo=item.valor;
                this.existe = true 
                this.mensajeSaldo=" Usted va a cargar  $" + item.valor + " a su credito"
                
              }
            
              });
          });
      
  
  
        }, (err) => {
      alert("Error occured : " + err);
  });   
  
  
}



encodeText(){
  this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE,this.encodeData).then((encodedData) => {

      console.log(encodedData);
      this.encodedData = encodedData;

  }, (err) => {
      console.log("Error occured : " + err);
  });                 
}
  ionViewDidLoad() {
  
    console.log('ionViewDidLoad EscanearPage');
  }

}
