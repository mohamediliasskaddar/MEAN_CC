// src/app/client/client.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interface modèle Client
export interface Client {
  _id?: string;
  nom: string;
  age: number;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl = 'http://localhost:3000/api/clients';

  constructor(private http: HttpClient) {}

  // Récupérer tous les clients
  getAll(): Observable<Client[]> {
    return this.http.get<Client[]>(this.apiUrl);
  }

  // Créer un nouveau client
  create(client: Client): Observable<Client> {
    return this.http.post<Client>(this.apiUrl, client);
  }
}
