import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NavController} from 'ionic-angular';
import {VerperfilPage} from '../verperfil/verperfil';
import {PersonaDaoProvider} from '../../providers/persona-dao/persona-dao';
import {AlertController} from 'ionic-angular';



declare var jquery: any;
declare var $: any;

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    ElFormu: FormGroup;
    contador = 0;

    losdatos;

    Edificio: Object = Array();
    constructor(public navCtrl: NavController,
        public fb: FormBuilder,
        public envio: PersonaDaoProvider,
        private alertCtrl: AlertController) {
        this.CargarValida();
    }

    CargarValida() {
        this.ElFormu = this.fb.group({
            CC: ['', [Validators.required]],
            NOM: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(40)]],
            APE: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(40)]],
            URL: ['', [Validators.pattern(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/)]],
            Genero: ['', [Validators.required]],
            perfil: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(255)]]
        });
    }

    capturarDatos() {
        let persona: Object = this.ElFormu.value;
        this.almacenarPersona(persona);
        this.contador++;
    }
    funciona(): void {
        console.log("funciona el metodo");
    }


    edi: Object;
    listaPer(): void {
        let DatosServ;
        DatosServ = this.envio.traerDatos();
        DatosServ.subscribe(data => {
            this.edi = data;
            console.table(data);
        }, err => {
            console.log(err.message);
        });
    }


    Limpiar() {
        this.edi = null;
    }


    VerPerfil() {
        this.navCtrl.push(VerperfilPage);
    }

    verMiPerfil(Perfil) {
        this.navCtrl.push(VerperfilPage, {local: Perfil});
    }

    laRespuesta;
    almacenarPersona(Persona) {
        this.laRespuesta = this.envio.postDatos(Persona);
        this.laRespuesta.subscribe(data => {
            let info = data;
            if (info.resp == "ok") {
                this.presentAlert("Comunicado", "Los datos fueron Registrados");
                this.CargarValida();
            } else {
                this.presentAlert("Error", "Los datos ya existen");
            }
        }, err => {
            console.log(err.message);
            this.presentAlert("Error", "Existe un error con el servidor");
        });
    }



    presentAlert(titulo, Mensaje) {
        let alert = this.alertCtrl.create({
            title: titulo,
            subTitle: Mensaje,
            buttons: ['Aceptar']
        });
        alert.present();
    }

}
