import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Observable, of, startWith } from 'rxjs';
import { HomeService } from './home.service';
import { LoginService } from '../login/login.service';

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
  
  comentarios: any[] = [];
  forMe: any[] = [];
  usuarios: any[] = [];
  posts: any[] = [];
  buscar: any[] = [];

  filteredUsers: Observable<any[]> = of([]);
  controlCambios = new FormControl();

  constructor(private route: Router, private homeService: HomeService, private loginService: LoginService) {}

  ngOnInit() {
    this.logueado = localStorage.getItem('rol') || '';

    if (this.logueado) {
      this.rol = this.logueado;
      console.log(this.rol);
    }

    this.user();

    this.filteredUsers = this.controlCambios.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

    this.controlCambios.valueChanges.subscribe(value => {
      console.log(value);
      this.forMe = this._filter(value);

      if (this.forMe.length === 0) {
        this.forMe = this.buscar;
      }

      let usuario = 0;

      this.forMe.forEach((user: any) => {

        if (user.username === value) {
          usuario = user.userId;
          console.log('Usuario encontrado:', usuario);
        }

      });

      if (usuario != 0) {
        this.revisarPerfil(usuario);
      }


    });
  }

  private _filter(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.forMe.filter(user => 
      user.username.toLowerCase().includes(filterValue) || 
      user.descripcion.toLowerCase().includes(filterValue)
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
    if (username === 'me') {
      const username = localStorage.getItem('userId');
      console.log('Navegando a mi perfil');
      this.route.navigate(['/Profile', username]);
    } else {
      console.log('Navegando al perfil de:', username);
      this.route.navigate(['/Profile', username]);
    }
  }

  like(postId: any): void {

    const userId = localStorage.getItem('userId');
    
    console.log('El usuario con id', userId , 'le dio like al Post con id ', postId)

    if(userId != null){

      this.homeService.like(userId, postId).subscribe(
        (Response: any) => {
          console.log('Respuesta del servidor:', Response);
        },
        (error) => {
          console.error('Error al obtener los posts:', error);
        }
      );
    }
  }

  comment(postId: string): void {
    this.comentarPostFlag = true;
  
    console.log('Vamos a comentar');
    this.flagComentario += 1;
    console.log(this.flagComentario);
  
    this.comentario = this.flagComentario % 2 !== 0;
    console.log(this.comentario ? 'Abrir' : 'Cerrar');
  
    if (this.comentario) {
      localStorage.setItem('postId', postId);

     this.homeService.comentarios().subscribe(
        (Response: any) => {
          console.log('Respuesta del servidor:', Response);
          this.comentarios = Response;
        },
        (error) => {
          console.error('Error al obtener los posts:', error);
        }
      );

    } else {
      localStorage.removeItem('postId');
    }
  }
  

  comentarPost(): void {

    const userId = localStorage.getItem('userId');
    const postId = localStorage.getItem('postId');

    if (userId != null && postId != null) {
      this.homeService.comentarPost(userId, postId, this.nuevoComentario).subscribe(
        (Response: any) => {
          console.log('Respuesta del servidor:', Response);
        },
        (error) => {
          console.error('Error al obtener los posts:', error);
        }
      );
    }

  }

  guardarComentario(): void {
    const userId = localStorage.getItem('userId');
    const postId = localStorage.getItem('postId');

    if (userId != null && postId != null) {
      this.homeService.comentarPost(userId, postId, this.nuevoComentario).subscribe(
        (Response: any) => {
          console.log('Respuesta del servidor:', Response);
        },
        (error) => {
          console.error('Error al obtener los posts:', error);
        }
      );
    }
  }

  share(): void {
    console.log('Vamos a compartir');
  }

  delete(): void {
    console.log('Vamos a eliminar');
  }

  post(usuarios: any[]): void {
    this.homeService.post().subscribe(
      (Response: any) => {
        console.log('Respuesta del servidor:', Response);
        this.posts = Response;  
        this.renderizar(this.posts, usuarios);
      },
      (error) => {
        console.error('Error al obtener los posts:', error);
      }
    );
  }
  
  user(): void {
    this.loginService.Login().subscribe(
      (Response: any) => {
        console.log('Respuesta del servidor:', Response);
        this.usuarios = Response;
        this.post(this.usuarios); 
      },
      (error) => {
        console.log('Error del servidor:', error);
      }
    );
  }
  
  renderizar(posts: any[], usuarios: any[]): void {
    this.forMe = [];

    posts.forEach((post: any) => {
      usuarios.forEach((user: any) => {
        if (post.username === user.username) {
          this.forMe.push({
            userId: user.userId,
            postId: post.postId,
            username: user.name,
            user: user.email,
            descripcion: post.content,
            title: post.title,
            pubDate: post.pubDate
          });
        }
      });
    });

    const uniqueDescriptions = new Set(); 
    this.forMe = this.forMe.filter((item) => {
      if (!uniqueDescriptions.has(item.descripcion)) {
        uniqueDescriptions.add(item.descripcion); 
        return true; 
      }
      return false; 
    });

    this.buscar = this.forMe;

    console.log('Usuarios que me interesan:', this.forMe);
  }
}
