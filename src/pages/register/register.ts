import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireModule} from 'angularfire2';
import { AngularFireAuthModule,AngularFireAuth, } from 'angularfire2/auth';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {firebase}  from 'firebase/database';
import { TabsPage } from '../tabs/tabs';
import { LoginPage } from '../login/login';
/**
 * Generated class for the RegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  username:string;
  password:string;
  Mensaje:string;
  passwordconfirm:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,private _auth:AngularFireAuth) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  async Aceptar()
  {

    if(this.password==this.passwordconfirm)
    try{
      const result = await this._auth.auth.createUserWithEmailAndPassword(this.username,this.password);
      this.Mensaje=this.username + " Fue ingresado Exitosamente!"
      alert(this.Mensaje);
      this.navCtrl.push(LoginPage);
      }
      catch(e){
      console.error(e);
          alert(e);
      }
    else
      {alert("las claves no coinciden, intente nuevamente");}
      

  }
  async Cancelar()
  {
    this.navCtrl.push(LoginPage);
  }

}
