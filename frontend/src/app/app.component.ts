import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ClientComponent } from './client/client.component';
import { FactureComponent } from './facture/facture.component';

@Component({
  selector: 'app-root',
  imports: [ClientComponent, FactureComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
 
}

