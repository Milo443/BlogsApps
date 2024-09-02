import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environment/environment';

@Injectable({
    providedIn: 'root',
})

export class LoginCreateService {

    // Definir los endpoints de la API
    private API = environment.API;

    constructor(private http: HttpClient) { }

    // Método para agregar un nuevo punto de venta
    public LoginCreate(email: string, password: string, role: string) {
        // Crear el objeto con todos los datos del formulario
        const objLogin = { email: email, password: password, role: role };

        console.log('Objeto a loguear:', objLogin);

        // Enviar la solicitud POST
        return this.http.post<any>(`${this.API}Login`, objLogin);
    }

}