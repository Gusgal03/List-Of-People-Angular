import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from './login/login.service';
import { Persona } from './persona.model';

@Injectable()
export class DataServices{
    constructor(private httpClient: HttpClient, 
            private loginService: LoginService
        ){}
        
    //Cargar Personas, traer el arreglo almacenado en la base de datos
    cargarPersonas(){
        const token = this.loginService.getIdToken();
        return this.httpClient.get<Persona[]>('https://listado-personas-f109a-default-rtdb.firebaseio.com/datos.json?auth=' + token);
    }

    //Guardar Personas
    guardarPersonas(personas: Persona[]){ //recibe un arreglo de personas
        const token = this.loginService.getIdToken();
        this.httpClient.put('https://listado-personas-f109a-default-rtdb.firebaseio.com/datos.json?auth=' + token, personas)
        .subscribe(
            response => console.log("resultado de guardar Personas" + response),
            error  => console.log("Error al guardar personas: " + error)
        );
    }

    modificarPersona(index: number, persona: Persona){
        const token = this.loginService.getIdToken();
        let url: string;
        url = 'https://listado-personas-f109a-default-rtdb.firebaseio.com/datos/' + index + '.json?auth=' + token;
        this.httpClient.put(url, persona)
            .subscribe(
                response => console.log("resultado de modificar el objeto persona" + response)
            , error => console.log("Error en modificar persona: " + error)
            )
    }

    eliminarPersona(index: number){
        const token = this.loginService.getIdToken();
        let url: string;
        url = 'https://listado-personas-f109a-default-rtdb.firebaseio.com/datos/' + index + '.json?auth=' + token;
        this.httpClient.delete(url)
            .subscribe(
                response => console.log("resultado de eliminar el objeto persona" + response)
            , error => console.log("Error en eliminar persona: " + error)
            )
    }
}