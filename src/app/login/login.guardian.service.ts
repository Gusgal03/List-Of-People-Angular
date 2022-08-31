import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { LoginService } from "./login.service";

@Injectable()
export class LoginGuardian implements CanActivate {
    
    constructor(private loginService: LoginService,
                private router: Router 
    ){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        if(this.loginService.isAutenticado()){
            return true; //Si esta autenticado, se muestra la página
        }
        else{ 
            this.router.navigate(['login']);
            return false; //Si no, que se loggee
        }
    }
}