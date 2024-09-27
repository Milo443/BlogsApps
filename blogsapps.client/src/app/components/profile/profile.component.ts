import { Component, OnInit } from '@angular/core';
import { UsuarioService } from './login.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  editMode: boolean = false;
  usuarioPerfil: any = {};
  postUsuario: any[] = [];
  rol: string = '';
  user: string = '';
  user_perfil: string = '';
  user_post: string = '';
  comentario: boolean = false;
  flagComentario: number = 0;
  comentarPostFlag: boolean = false;
  nuevoComentario: string = '';

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.rol = localStorage.getItem('rol') || '';
    this.user = localStorage.getItem('user') || '';
    this.user_perfil = localStorage.getItem('user') || '';
    this.route.paramMap.subscribe(params => {
      const username = params.get('username');
      this.user_post = username || '';

      if (username) {
        this.cargarperfil(username);
      }

      if (this.user === username) {
        this.user = username;
        console.log('Es mi perfil');
      } else {
        console.log('No es mi perfil');
        this.user = '';
      }

    });
  }

  activarEdicion(): void {
    this.editMode = true;
  }

  cancelarEdicion(): void {
    this.editMode = false;
    if (this.usuarioPerfil.username) {
      this.cargarperfil(this.usuarioPerfil.username);
    }
  }

  guardarCambios(): void {
    this.usuarioService.actualizarPerfil(this.usuarioPerfil).subscribe(
      (response) => {
        this.editMode = false;
        console.log('Perfil actualizado:', response);
      },
      (error) => {
        console.error('Error al actualizar el perfil:', error);
      }
    );
  }

  home(): void {
    this.router.navigate(['/home']);
  }

  follow(): void {
    console.log(this.user_perfil, ' empezo a seguir a ', this.user_post);
  }

  unfollow(): void {
    console.log(this.user_perfil, ' dejo de seguir a ', this.user_post);
  }

  block(): void {
    console.log(this.user_perfil, ' bloqueo al usuario ', this.user_post);
  }

  unlock(): void {
    console.log(this.user_perfil, ' desbloqueo al usuario ', this.user_post);
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

  like(): void {
    console.log('Vamos a dar like');
  }


  cargarperfil(username: string): void {

    this.usuarioService.obtenerPerfil(username).subscribe(
      (response) => {
        this.usuarioPerfil = response;
        console.log('Perfil cargado:', response);
        this.post(response.name, response.email);
      },
      (error) => {
        console.error('Error al cargar el perfil:', error);

  });
}

post(name: string, username: string): void {
  this.usuarioService.post().subscribe(
    (response) => {
      const postsConUsuario = response.map((post: any) => ({
        ...post,
        username: username,
        user: name
      }));

      // Agrega los nuevos posts al array existente
      this.postUsuario = [...this.postUsuario, ...postsConUsuario]; 
      console.log('Posts actualizados:', this.postUsuario);
    },
    (error) => {
      console.error('Error al cargar los posts:', error);
    }
  );
}




}