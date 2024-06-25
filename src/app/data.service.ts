import { Router } from '@angular/router';
import { Injectable , NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Auth, GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private afAuth: AngularFireAuth, private router : Router) { }

  signUp(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  signIn(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  signOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('photoURL');
    localStorage.removeItem('displayName');
    this.afAuth.signOut();
  }

  async loginWithGoogle(): Promise<void> {
    try {
      const auth: Auth = getAuth(); 
      const provider = new GoogleAuthProvider(); 

      const res = await signInWithPopup(auth, provider); 
      const user = res.user;
      
      const token = user.refreshToken;
     
       localStorage.setItem('token', token);
       localStorage.setItem('google', 'true');
      localStorage.setItem('photoURL', user.photoURL);
      localStorage.setItem('displayName', user.displayName);
      this.router.navigate(['/home']);
    } catch (error) {
      console.error('Erreur lors de la connexion avec Google:', error);
      throw error; 
    }
  }

  async signUpWithGoogle(): Promise<void> {
    try {
      const auth: Auth = getAuth();
      const provider = new GoogleAuthProvider();

      const res = await signInWithPopup(auth, provider);
      const user = res.user;
      
      const token = user.refreshToken;
     
       localStorage.setItem('token', token);
      localStorage.setItem('photoURL', user.photoURL);
      localStorage.setItem('displayName', user.displayName);
      this.router.navigate(['/home']);
      
    } catch (error) {
      console.error('Erreur lors de l\'inscription avec Google:', error);
      throw error;
    }
  }





  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  async getCurrentUserToken(): Promise<String | null> {
    const user = await this.afAuth.currentUser;
    if (user) {
      const idToken = await user.getIdToken();
      return idToken;
    }
    return null;
  }

}
