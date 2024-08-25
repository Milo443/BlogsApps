import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-create',
  templateUrl: './login-create.component.html',
  styleUrl: './login-create.component.css'
})
export class LoginCreateComponent {
  form: FormGroup;
  roles: string[] = ['admin', 'user', 'invitado'];
  equalPasswords: string = '';

  constructor(private blog: FormBuilder, private route: Router) {
    this.form = this.blog.group({
      email: ['', [Validators.required, Validators.email]],
      contraseña: ['', [Validators.required, Validators.minLength(6)]],
      confirmarContraseña: ['', [Validators.required, Validators.minLength(6),]],
      role: ['user'] 
    });
  }

  ngOnInit(): void {
   
    this.form.valueChanges.subscribe((values) => {
      console.log('El email es:', this.form.get('email')?.value);
      console.log('La contraseña es:', this.form.get('contraseña')?.value);
      console.log('La confirmación de la contraseña es:', this.form.get('confirmarContraseña')?.value);

     if (this.form.get('contraseña')?.value !== this.form.get('confirmarContraseña')?.value) {
        this.equalPasswords = 'false';
        console.log('Las contraseñas no coinciden', this.equalPasswords);
      }else {
        this.equalPasswords = 'true';
        console.log('Las contraseñas coinciden', this.equalPasswords);

    }
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

  LoginCreate(): void {
    if (this.form.valid) { // Asegúrate de que el formulario sea válido
      const email = this.form.get('email')?.value;
      const contraseña = this.form.get('contraseña')?.value;
      const confirmarContraseña = this.form.get('confirmarContraseña')?.value;
      const role = this.form.get('role')?.value;

      console.log('Creando al usuario con email:', email);
      console.log('Contraseña:', contraseña);
      console.log('Confirmación de contraseña:', confirmarContraseña);
      console.log('Rol:', role);

      // Aquí podrías realizar la lógica adicional para crear el usuario
      // Ejemplo: enviar los datos a un servicio para guardarlos
    } else {
      console.log('El formulario no es válido');
    }
  }

  navigateLogin(): void {

    console.log('Navigating to login  page');

    this.route.navigate(['/Login']);

  }

}
