import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PersonaDaoProvider } from '../../providers/persona-dao/persona-dao';
import { AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { VistaModiPage } from '../vista-modi/vista-modi';

/**
 * Generated class for the VerperfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-verperfil',
  templateUrl: 'verperfil.html',
})
export class VerperfilPage {

  miperfil;
  constructor(
  public navCtrl: NavController, 
  public navParams: NavParams,
  public envio: PersonaDaoProvider,
  private alertCtrl: AlertController) {
    this.miperfil = navParams.get('local');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerperfilPage');
  }
  
  
    Eliminar() {
    let alert = this.alertCtrl.create({
    title: 'Confirme la eliminación',
    message: 'Del Usuario <b>'+this.miperfil.nombre+'</b>',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
        }
      },
      {
        text: 'Confirmar',
        handler: () => {
          let LocalServer = this.envio.eliminar(this.miperfil.id);
          let data;
          LocalServer.subscribe(data=>{
            this.procesarRespues(data);
          },err => {
            console.log(err.message);
          });
        }
      }
    ]
  });
  alert.present();
}
  
  procesarRespues(data){
    let Resputa = data;
    if(Resputa.resp == "ok"){
        this.presentAlert("Confirmación", "El usuario ya fue Eliminado");
        this.navCtrl.setRoot(HomePage);
    }else{
        this.presentAlert("Error #23", "El usuario no fue Eliminado");
    }
  }
  
  presentAlert(titulo, Mensaje) {
    let alert = this.alertCtrl.create({
        title: titulo,
        subTitle: Mensaje,
        buttons: ['Aceptar']
    });
    alert.present();
  }
  
  
  cargarParaModi(){
    this.navCtrl.setRoot(VistaModiPage,{id:this.miperfil.id});
  } 
}