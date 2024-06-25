import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  image ="";
  display_name="";
  constructor(private authService:DataService,private router: Router, private route : ActivatedRoute) { }
  async ngOnInit() {
    const localToken = localStorage.getItem('token');
    this.image = localStorage.getItem('photoURL');
    this.display_name = localStorage.getItem('displayName');
    const google = localStorage.getItem('google');
    if(this.image==''){
      this.image = 'assets/boogi.jpg'
    }
    const firebaseToken = await this.authService.getCurrentUserToken();

    if (!localToken && (localToken !== firebaseToken || !google) ) {
      this.router.navigate(['/login']);
    }
  }

  sign_out() {
    this.authService.signOut();
    this.router.navigate(['/login']);
  }


}
