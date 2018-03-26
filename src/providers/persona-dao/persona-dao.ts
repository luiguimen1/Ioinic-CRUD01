import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the PersonaDaoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PersonaDaoProvider {

  constructor(public http: HttpClient) {
    console.log('Hello PersonaDaoProvider Provider');
  }
  
  options = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  };  
  postDatos(ElUsuario){
  var url = 'http://192.168.0.225:8081/movil/llegada.php';
  return this.http.post(url,JSON.stringify(ElUsuario),this.options);
 }
 
 traerDatos(){ 
  var url = 'http://192.168.0.225:8081/movil/ListPersona.php';
   return this.http.post(url,"{acceso:true}",this.options);
 }
  
  
  eliminar(id){
  let persona:object={
   ID:id
  }
  var url = 'http://192.168.0.225:8081/movil/EliPersona.php';
   return this.http.post(url,JSON.stringify(persona),this.options);
 }
 
 
 buscarXiD(ID){ 
   
  let persona:object={
  acceso: true,
   ID:ID
  }
  
  var url = 'http://192.168.0.225:8081/movil/busXID.php';
   return this.http.post(url,JSON.stringify(persona),this.options);
 }
 
 
 modicarPer(ElUsuario){
  var url = 'http://192.168.0.225:8081/movil/ModiPer.php';
  return this.http.post(url,JSON.stringify(ElUsuario),this.options);
 }
 
 
 
}
