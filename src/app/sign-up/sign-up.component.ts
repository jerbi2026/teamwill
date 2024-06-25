import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  email="";
  password="";
  rep_password="";
  message="";
  

  constructor(
    private authService: DataService,
    private router: Router,
  ) {}


  signUp() {
    if(this.rep_password==this.password && this.password.length>6 ){
      if(this.email.includes("@teamwill.com")){
        this.authService.signUp(this.email, this.password)
          .then((res:any) => {
            this.router.navigate(['/login']);
          })
          .catch(err => {
              this.message = 'Erreur lors de la connexion : '+ err;
          });

      }
      else{
        this.message = 'Erreur lors de la connexion : Veuillez utiliser une adresse email @teamwill.com';
      }
      
      

    }
    else{
      this.message = 'Erreur lors de la connexion : Les mots de passe ne sont pas identiques ou le mot de passe est inférieur à 6 caractères';
    }
    let dialog = document.getElementById('dialog');
    if(dialog){
          dialog.style.display = "block";
    }
    
  }

  Sign_upWithGoogle(){
    this.authService.signUpWithGoogle();
  }

  close_dialog(){
    let dialog = document.getElementById('dialog');
    if(dialog){
      dialog.style.display = "none";
    }
    this.router.navigate(['/login']);
  }
  

}
