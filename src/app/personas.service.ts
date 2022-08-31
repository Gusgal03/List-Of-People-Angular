import { Persona } from "./persona.model";
import { LoggingService } from "./LoggingService.service";
import { EventEmitter, Injectable } from "@angular/core";
import { DataServices } from "./data.services";





@Injectable()
export class PersonasService{
    personas: Persona[] = [];

    saludar = new EventEmitter<number>();
    constructor(private loggingService: LoggingService,
                private dataServices: DataServices
        ){    
    }

    setPersonas(personas: Persona[]){
        this.personas = personas;
    }

    obtenerPersonas(){
        return this.dataServices.cargarPersonas();
    }

    agregarPersona(persona: Persona){
        this.loggingService.enviaMensajeAConsola("agregamos persona: " + persona.nombre);
        if(this.personas == null){
            this.personas = [];
        }
        this.personas.push(persona);
        this.dataServices.guardarPersonas(this.personas);
      }

    encontrarPersona(index: number){
        let persona: Persona = this.personas[index];
        return persona;
    }

    modificarPersona(index: number, persona: Persona){
        let persona1 = this.personas[index]; //devolvemos el objeto persona en el índice que estamos proporcionando
        persona1.nombre = persona.nombre; //con esto modificamos los valores de la persona que estamos modificando
        persona1.apellido = persona.apellido;
        this.dataServices.modificarPersona(index, persona);
    }

    eliminarPersona(index: number){
        this.personas.splice(index, 1);
        this.dataServices.eliminarPersona(index);
        //Se vuelve a guardar el arreglo
        this.modificarPersonas();
    }

    modificarPersonas(){
        if(this.personas != null){
            this.dataServices.guardarPersonas(this.personas);
        }
    }
}