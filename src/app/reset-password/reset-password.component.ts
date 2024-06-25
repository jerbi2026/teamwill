import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {

  email="";
  message="";

  constructor(private afAuth:AngularFireAuth, private Router : Router) { }

  resetPassword() {
    this.afAuth.sendPasswordResetEmail(this.email)
      .then(() => {
        
        this.message = "Un e-mail de réinitialisation de mot de passe a été envoyé à votre adresse e-mail.";
      
      })
      .catch((error) => {
        console.error(error);
        this.message = "Une erreur s'est produite lors de l'envoi de l'e-mail de réinitialisation de mot de passe. Veuillez réessayer plus tard.";
      });
      let dialog = document.getElementById('dialog');
      if(dialog){
            dialog.style.display = "block";
      }
  }

  close_dialog(){
    let dialog = document.getElementById('dialog');
    if(dialog){
      dialog.style.display = "none";
    }
    this.Router.navigate(['/login']);
  }

}
