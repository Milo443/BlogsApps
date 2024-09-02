import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  form: FormGroup;

  constructor(private blog: FormBuilder, private route: Router, private loginService: LoginService) {
    this.form = this.blog.group({
      email: ['', [Validators.required, Validators.email]],
      contraseña: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {

    this.form.valueChanges.subscribe((values) => {
      console.log('El email es:', values.email);
      console.log('La contraseña es:', values.contraseña);
    });
  }


  LoginGoogle(): void {

    console.log('Login with Google');

    window.open('http://google.com/');
  }

  LoginFacebook(): void {

    console.log('Login with Facebook');

    window.open('http://facebook.com/');

  }

  Login(): void {
    this.loginService.Login(this.form.value.email, this.form.value.contraseña).subscribe(
      (Response: any) => {
        console.log('Respuesta del servidor:', Response);

        localStorage.setItem('rol', Response.token);

        //localStorage.removeItem('rol');

      }, (error) => {
        console.log('Respuesta del servidor:', error);
      });
  }

  recuperar(): void {
    console.log('Intentando recuperar contraseña');
  }

  naviagationCreate(): void {
    console.log('Navegando a la pagina de registro');
    this.route.navigate(['/LoginCreate']);
  }

}
