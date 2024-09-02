import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Observable, of, startWith } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  form: FormGroup | undefined;

  rol: string = '';
  logueado: string = '';
  comentario: boolean = false;
  flagComentario: number = 0;
  comentarPostFlag: boolean = false;
  nuevoComentario: string = '';

  forMe: any[] = [];

  // Datos de usuarios
  public usuarios = [
    {
      user: 'user1',
      username: 'johndoe',
      descripcion: 'Desarrollador frontend con 5 años de experiencia en Angular y React.',
      imageUrl: 'https://picsum.photos/200/200?random=1'
    },
    {
      user: 'user2',
      username: 'janedoe',
      descripcion: 'Ingeniero de software con experiencia en backend utilizando Node.js y Python.',
      imageUrl: 'https://picsum.photos/200/200?random=3'
    },
    {
      user: 'user2',
      username: 'janedoe',
      descripcion: 'Ingeniero de software con experiencia en backend utilizando Node.js y Python.',
      imageUrl: 'https://picsum.photos/200/200?random=3'
    },
    {
      user: 'user3',
      username: 'michael',
      descripcion: 'Ingeniero de software con experiencia en backend utilizando Node.js y Python.',
      imageUrl: 'https://picsum.photos/200/200?random=3'
    },
    {
      user: 'user4',
      username: 'emily',
      descripcion: 'Data scientist con habilidades en análisis de datos y aprendizaje automático.',
      imageUrl: 'https://picsum.photos/200/200?random=4'
    },
    {
      user: 'user5',
      username: 'alex',
      descripcion: 'Product manager con experiencia en gestión de proyectos ágiles y desarrollo de producto.',
      imageUrl: 'https://picsum.photos/200/200?random=5'
    },
    {
      user: 'user6',
      username: 'sarah',
      descripcion: 'Desarrolladora de bases de datos con experiencia en SQL y NoSQL.',
      imageUrl: 'https://picsum.photos/200/200?random=6'
    },
    {
      user: 'user7',
      username: 'david',
      descripcion: 'Administrador de sistemas con experiencia en servidores y redes.',
      imageUrl: 'https://picsum.photos/200/200?random=7'
    },
    {
      user: 'user8',
      username: 'laura',
      descripcion: 'Especialista en seguridad informática con un enfoque en protección de datos y prevención de amenazas.',
      imageUrl: 'https://picsum.photos/200/200?random=8'
    }
  ];

  filteredUsers: Observable<any[]> = of([]);

  controlCambios = new FormControl();

  ngOnInit() {

    this.logueado = localStorage.getItem('rol') || '';

    if (this.logueado != '') {
      this.rol = this.logueado;
      console.log(this.rol);
    }

    this.forMe = this.usuarios;

    this.filteredUsers = this.controlCambios.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );

    this.controlCambios.valueChanges.subscribe(value => {
      console.log(value);
      this.revisarPerfil(value);
      this.forMe = this._filter(value);
    });
  }

  constructor(private route: Router) { }

  private _filter(value: string): any[] {
    const filterValue = value.toLowerCase();

    return this.usuarios.filter(user => user.username.toLowerCase().includes(filterValue) || user.descripcion.toLowerCase().includes(filterValue)
    );
  }

  Login(): void {
    this.route.navigate(['/Login']);
  }

  Logout(): void {
    localStorage.removeItem('rol');
    localStorage.removeItem('user');
    this.route.navigate(['/Login']);
  }

  revisarPerfil(username: any): void {

    if (username == 'me') {
      console.log('Navegando a mi perfil');
      username = localStorage.getItem('user');
      this.route.navigate(['/Profile', username]);
    } else {
      console.log('Navegando al perfil de:', username);
      this.route.navigate(['/Profile', username]);

    }
  }

  like(): void {
    console.log('Vamos a dar like');
  }

  comment(): void {
    console.log('Vamos a Comentar');
    this.flagComentario += 1;

    console.log(this.flagComentario);

    if (this.flagComentario % 2 !== 0) {
      this.comentario = true;
      console.log('Abrir');
    } else {
      this.comentario = false;
      this.flagComentario = 0;
      console.log('Cerrar');
    }
  }

  comentarPost(): void {

    this.comentarPostFlag = true;

  }

  guardarComentario(): void {

    console.log('El comentario es: ', this.nuevoComentario);

  }

  share(): void {

    console.log('Vamos a compartir');

  }

  delete(): void {

    console.log('Vamos a eliminar');

  }

}