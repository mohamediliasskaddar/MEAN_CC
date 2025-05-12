import { Component, OnInit } from '@angular/core';
import { AppsrvService } from '../services/appsrv.service';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-client',
  imports: [NgFor,CommonModule,FormsModule],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent implements OnInit {

   clients: any[] = [];
   selectedClientId: string = '';
   now = new Date();
  constructor( private srv : AppsrvService){}

  ngOnInit(): void {
    this.srv.getClients().subscribe({
      next : (data)=> {
        this.clients = data;
        console.log('Clients reçus :', this.clients);
        
      },
      error: (err) => {
        console.error('Erreur lors du chargement des clients', err);
      }
    });
  }

  onClientChange() {
    if (this.selectedClientId) {
    this.srv.selectedClientId = this.selectedClientId;
  }
  }

  
}
