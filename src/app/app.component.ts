import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { LoginService } from './login/login.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  titulo = 'Listado de personas';

  
  constructor(private loginService: LoginService){
  }

  ngOnInit(): void {
    firebase.initializeApp({
      apiKey: "AIzaSyD-c4ggDxzV--AAwTTQLHOXswSOcC6WZfA",
      authDomain: "listado-personas-f109a.firebaseapp.com",    
    })
  }

  isAutenticado(){
    return this.loginService.isAutenticado();
  }

  salir(){
    this.loginService.logout();
  }
}
