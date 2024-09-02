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
  rol: string = '';
  user: string = '';
  user_perfil: string = '';
  user_post: string = '';
  comentario: boolean = false;
  flagComentario: number = 0;
  comentarPostFlag: boolean = false;
  nuevoComentario: string = '';

  public post = [
    {
      user: 'user1',
      username: 'johndoe',
      descripcion: 'Desarrollador frontend con 5 años de experiencia en Angular y React.',
      imageUrl: 'https://picsum.photos/200/200?random=1'
    },
    {
      user: 'user2',
      username: 'janedoe',
      descripcion: 'Especialista en diseño UX/UI con un enfoque en accesibilidad y usabilidad.',
      imageUrl: 'https://picsum.photos/200/200?random=2'
    },
    {
      user: 'user2',
      username: 'janedoe',
      descripcion: 'Especialista en diseño UX/UI con un enfoque en accesibilidad y usabilidad.',
      imageUrl: 'https://picsum.photos/200/200?random=2'
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
    this.usuarioPerfil = this.post.find((post) => post.username === username) || {};
    console.log('Perfil del usuario:', this.usuarioPerfil);
  }
}