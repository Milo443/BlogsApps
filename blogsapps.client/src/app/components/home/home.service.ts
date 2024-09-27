import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environment/environment';

@Injectable({
    providedIn: 'root',
})

export class HomeService {

    // Definir los endpoints de la API
    private API = environment.API;

    constructor(private http: HttpClient) { }

    // Método para traer los post
    public post() {
        // Enviar la solicitud POST
        return this.http.get<any>(`${this.API}Posts`);
    }

        // Método para traer los post
        public comentarios() {
            // Enviar la solicitud POST
            return this.http.get<any>(`${this.API}Comments`);
        }

    // Comentario para crear un comentario
    public comentarPost(userId: string, postIdId: string, comentario: string){

        const objLogin = { userId: userId, postIdId: postIdId, content: comentario};

        console.log('Objeto de usuario a crear: ', objLogin);

        // Enviar la solicitud POST
        return this.http.post<any>(`${this.API}Comments`, objLogin);

    }
    

    // Método para dar like
    public like(userId: string, likeId: string){

        const objLogin = { userId: userId, likeId: likeId};

        console.log('Objeto de usuario a crear: ', objLogin);

        // Enviar la solicitud POST
        return this.http.post<any>(`${this.API}LikedPosts`, objLogin);


    }

}