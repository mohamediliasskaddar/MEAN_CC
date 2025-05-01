// src/app/facture/facture-form/facture-form.component.ts
import { Component, Input,  Output, EventEmitter,OnInit, OnChanges, SimpleChanges,  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Client } from '../../client/client.service';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProduitService, Produit } from '../produit.service';


@Component({
  selector: 'app-facture-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './facture-form.component.html',
  styleUrls: ['./facture-form.component.css']
})
export class FactureFormComponent implements OnInit {
  //@Input() client!: Client;
  @Input() client!: any;
  factureForm: FormGroup;
  produits: Produit[] = [];
  TVA = 0.20;

  constructor(
    private fb: FormBuilder,
    private produitService: ProduitService
  ) {
    // Initialisation du formulaire
    this.factureForm = this.fb.group({
      clientId: [null, Validators.required],  // À lier depuis le parent via @Input si besoin
      lignes: this.fb.array([])
    });
  }

  ngOnInit(): void {
    // Charger produits
    this.produitService.getAll().subscribe(data => this.produits = data);

    // Au moins une ligne vide au départ
    this.addLigne();
  }

   // Ajoute ngOnChanges avec debug
   ngOnChanges(changes: SimpleChanges): void {
    console.log('⚙️ ngOnChanges dans FactureFormComponent', changes);
    if (changes['client']) {
      console.log('🔍 Valeur de client reçue:', this.client);
      // si tu veux préremplir le form
      this.factureForm.get('clientId')?.setValue(this.client._id || this.client);
    }
  }

  // Getter pour le FormArray
  get lignes() {
    return this.factureForm.get('lignes') as FormArray;
  }

  // Crée un FormGroup pour une ligne
  createLigne(): FormGroup {
    return this.fb.group({
      produitId: [null, Validators.required],
      quantite: [1, [Validators.required, Validators.min(1)]],
      prixUnitaire: [{value: 0, disabled: true}],
      totalLigne: [{value: 0, disabled: true}]
    });
  }

  // Ajoute une ligne
  addLigne(): void {
    const ligneFG = this.createLigne();

    // Quand on change de produit, mettre à jour prixUnitaire et totalLigne
    ligneFG.get('produitId')!.valueChanges.subscribe((prodId: string) => {
      const prod = this.produits.find(p => p._id === prodId);
      const puCtrl = ligneFG.get('prixUnitaire')!;
      puCtrl.setValue(prod ? prod.prix : 0);
      this.updateTotalLigne(ligneFG);
    });

    // Quand on change la quantité, recalcul du total ligne
    ligneFG.get('quantite')!.valueChanges.subscribe(() => {
      this.updateTotalLigne(ligneFG);
    });

    this.lignes.push(ligneFG);
  }

  // Supprime une ligne
  removeLigne(index: number): void {
    this.lignes.removeAt(index);
  }

  // Met à jour totalLigne d’une ligne donnée
  updateTotalLigne(ligneFG: FormGroup): void {
    const qte = ligneFG.get('quantite')!.value || 0;
    const pu = ligneFG.get('prixUnitaire')!.value || 0;
    ligneFG.get('totalLigne')!.setValue(qte * pu);
  }

  // Calcul du total HT
  get totalHT(): number {
    return this.lignes.controls
      .map(lg => lg.get('totalLigne')!.value)
      .reduce((acc, val) => acc + val, 0);
  }

  // Calcul du total TTC
  get totalTTC(): number {
    return this.totalHT * (1 + this.TVA);
  }

  // Soumission du formulaire
  onSubmit(): void {
    if (this.factureForm.invalid) {
      this.factureForm.markAllAsTouched();
      return;
    }
    const payload = {
      client: this.factureForm.value.clientId,
      date: new Date(),
      lignes: this.lignes.controls.map(lg => ({
        produit: lg.get('produitId')!.value,
        quantite: lg.get('quantite')!.value,
        totalLigne: lg.get('totalLigne')!.value
      }))
    };
    console.log('Payload commande à envoyer :', payload);
    // Ici, appeler CommandeService pour création.
  }
}