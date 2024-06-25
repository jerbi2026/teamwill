import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { AutomateService } from './../automate.service';
import { Component, Renderer2,OnInit } from '@angular/core';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements OnInit{
  image ="";
  display_name="";
  message: string = '';
  constructor(private AutomateService : AutomateService,private renderer: Renderer2,private authService:DataService,private router: Router, private route : ActivatedRoute) { }
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
  

  async sendMessage(message: string) {
    
    const messagesDiv = this.renderer.selectRootElement('#messages', true);
    const messageContainer = this.renderer.createElement('div');

    const messageElement = this.renderer.createElement('section');
    this.renderer.addClass(messageElement, 'message-section');
    const responseElement = this.renderer.createElement('article');
    this.renderer.addClass(responseElement, 'response-article');

    this.renderer.setProperty(messageElement, 'textContent', message);

    try {
      const response = await this.AutomateService.get_response(message);
      if (response) {
        this.renderer.setProperty(responseElement, 'textContent', response);
      } else {
        this.renderer.setProperty(responseElement, 'textContent', "Je n'ai pas compris votre message");
      }
    } catch (error) {
      console.error('Error fetching response:', error);
      this.renderer.setProperty(responseElement, 'textContent', "Erreur lors de la récupération de la réponse");
    }
    this.message='';

    this.renderer.appendChild(messageContainer, messageElement);
    this.renderer.appendChild(messageContainer, responseElement);

    if (messagesDiv) {
      this.renderer.appendChild(messagesDiv, messageContainer);
      messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }
  }



}
