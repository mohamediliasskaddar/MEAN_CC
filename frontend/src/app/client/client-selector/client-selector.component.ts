// src/app/client/client-selector/client-selector.component.ts
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientService, Client } from '../client.service';

@Component({
  selector: 'app-client-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './client-selector.component.html',
  styleUrls: ['./client-selector.component.css']
})
export class ClientSelectorComponent implements OnInit {
  clients: Client[] = [];

  /** Émet uniquement l’ID du client sélectionné */
  @Output() clientSelected = new EventEmitter<string>();

  constructor(private clientService: ClientService) {}

  ngOnInit() {
    this.clientService.getAll().subscribe({
      next: data => this.clients = data,
      error: err => console.error('Erreur chargement clients', err)
    });
  }

  onChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    const id = select.value;
    if (id) {
      this.clientSelected.emit(id);
    }
  }
}
