import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Produit {
  _id: string;
  libelle: string;
  prix: number;
}
@Injectable({
  providedIn: 'root'
})
export class AppsrvService {
  apiUrl = '/api'
 public selectedClientId: string = '';
  constructor(private http:HttpClient ) { }

   getClients(): Observable<any> {
    return this.http.get('/api/clients'); // Grâce au proxy
  }

  getProducts() :Observable<any>{
    return this.http.get<Produit[]>('/api/produits');
  }

  createCmd(
      data: {
        client : string;
         date: Date;
         lignes: { produitId: string, quantite: number, prixUnitaire: number }[];} ) 
        {  return this.http.post(`${this.apiUrl}/commandes`, data);   }

}

