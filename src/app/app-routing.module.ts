import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { authGuard } from './auth.guard';
import { PageBloqueComponent } from './page-bloque/page-bloque.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path:'home',component:HomeComponent, canActivate: [authGuard] },
  {path:'login',component:LoginComponent},
  {path:'forget_password',component:ResetPasswordComponent},
  {path:'sign_up',component:SignUpComponent},
  {path:'chatbot',component:ChatbotComponent, canActivate: [authGuard]},
 
  { path: '**', component: PageBloqueComponent }, 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
