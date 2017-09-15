import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireModule} from 'angularfire2';
import { AngularFireAuthModule,AngularFireAuth, } from 'angularfire2/auth';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {firebase}  from 'firebase/database';
import { TabsPage } from '../tabs/tabs';
import { RegisterPage } from '../register/register';
/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
username:string;
password:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,private _auth:AngularFireAuth) {
  }
  async login()
  {
   await this._auth.auth.signInWithEmailAndPassword(this.username,this.password)
                        .then(result => {this.navCtrl.push(TabsPage)})
                        .catch(function(error) {         
                            alert(error.message);
                            //console.log(error);
                            
                        });

                      // if(result!=undefined){
                        
                      //   console.log("INGRESO");
                      // }

  }
UserValido()
{
this.username="Leandro@Leandro.com";
this.password="Leandro123";

}

Registrarse(){
  this.navCtrl.push(RegisterPage);

}
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
