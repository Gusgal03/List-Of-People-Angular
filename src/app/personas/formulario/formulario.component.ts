import { Component, OnInit } from '@angular/core';
import { PersonasService } from '../../personas.service';
import { LoggingService } from '../../LoggingService.service';
import { Persona } from '../../persona.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent{
  
  nombreInput: string;
  apellidoInput: string;
  index: number;
  modoEdicion: number;
  
  constructor(private loggingService:LoggingService,
              private personasService: PersonasService,
              private router: Router,
              private route: ActivatedRoute
              ){
                this.personasService.saludar.subscribe(
                  (indice: number) => alert("El índice es: " + indice)
                );            
              }

  ngOnInit() {
    this.index = this.route.snapshot.params['id'];
    this.modoEdicion = +this.route.snapshot.queryParams['modoEdicion']; //el + convierte String a int

    if(this.modoEdicion != null && this.modoEdicion === 1){
      let persona: Persona = this.personasService.encontrarPersona(this.index);
      this.nombreInput = persona.nombre;
      this.apellidoInput = persona.apellido;
    }
  }

  guardarPersona(){
    let persona1 = new Persona (
      this.nombreInput, this.apellidoInput); //con esto accedemos al elemento Input en el html
      if(this.modoEdicion != null && this.modoEdicion === 1){ //modo de edición
        this.personasService.modificarPersona(this.index, persona1);
      }else{ //agregando una nueva persona
        this.personasService.agregarPersona(persona1);
      }
      //this.loggingService.enviaMensajeAConsola("Enviamos persona: " + persona1.nombre + " apellido: " + persona1.apellido);
      //this.personaCreada.emit(persona1);
      this.router.navigate(['personas']);
  }

  eliminarPersona(){
    if(this.index != null){
      this.personasService.eliminarPersona(this.index);
    }
    this.router.navigate(['personas']); //nos movemos hacia el listado de personas
  }
}
