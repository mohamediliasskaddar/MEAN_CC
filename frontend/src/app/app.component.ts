// // src/app/app.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientSelectorComponent } from './client/client-selector/client-selector.component';
import { FactureFormComponent }   from './facture/facture-form/facture-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ClientSelectorComponent,
    FactureFormComponent  // <-- il faut que ce soit bien ici
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  client: any = null;
  title: string= 'iliass';

  onClientSelected(c: any) {
    this.client = c;
  }
}
