import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environment/environment';

@Injectable({
    providedIn: 'root',
})

export class UsuarioService {

    // Definir los endpoints de la API
    private API = environment.API;

    constructor(private http: HttpClient) { }

    // Método para agregar un nuevo punto de venta
    public actualizarPerfil(usuario: any) {
        // Crear el objeto con todos los datos del formulario
        const objLogin = { usuario: usuario };

        console.log('Objeto a actualizar:', objLogin);

        // Enviar la solicitud POST
        return this.http.post<any>(`${this.API}Update`, objLogin);
    }

        // Método para traer los post
        public post() {
            // Enviar la solicitud POST
            return this.http.get<any>(`${this.API}Posts`);
        }

        public obtenerPerfil(username: string) {
            // Enviar la solicitud POST
            return this.http.get<any>(`${this.API}Users/${username}`);
        }

}