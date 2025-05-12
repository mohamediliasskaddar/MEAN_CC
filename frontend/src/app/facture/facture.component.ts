import { Component, OnInit } from '@angular/core';
import { AppsrvService, Produit } from '../services/appsrv.service';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-facture',
  standalone: true,
  imports: [CommonModule, NgFor, FormsModule],
  templateUrl: './facture.component.html',
  styleUrl: './facture.component.css'
})
export class FactureComponent implements OnInit {

  Products: Produit[] = [];
  seletedProduct: any;
  
  ligneCmd = [  { prodId: '', qte: 1, Pu: 0 } ];

  constructor(private srv : AppsrvService ){ }

  //ONINIT
  ngOnInit(): void {
    this.srv.getProducts().subscribe(
      {
        next : (produits)=>{
          this.Products = produits;
          console.log('Products reçus :', this.Products);
          
        },
      error: (err) => {
        console.error('Erreur lors du chargement des clients', err);
      }
    });
  }
  //
  onProd(index:number){
    const produit = this.Products.find(p=>p._id === this.ligneCmd[index].prodId);
    if (produit){
      this.ligneCmd[index].Pu = produit.prix;
    }
  }
  //
  newligne(){
    this.ligneCmd.push({ prodId: '', qte: 1, Pu: 0 } );
  }

  //
  deleteLigne(index:number){
    this.ligneCmd.splice(index, 1)
  }

  //

  saveCmd() {
    const cliId = this.srv.selectedClientId;
    const now = new Date();

    if (!cliId) {
      alert('Veuillez sélectionner un client.');
      return;
    }

    if (this.ligneCmd.some(l => !l.prodId)) {
      alert('Chaque ligne doit avoir un produit sélectionné.');
      return;
    }

    
    this.srv.createCmd({
      client : cliId,
      date: now,
      lignes: this.ligneCmd.map(l => ({
        produitId: l.prodId,
        quantite: l.qte,
        prixUnitaire: l.Pu
      }))
    }).subscribe(() => {
      alert('Commande enregistrée ✅');
     });  
    }

  get totalHT(): number {
    return this.ligneCmd.reduce((total, ligne) => {
      return total + (ligne.Pu * ligne.qte);
    }, 0);
  }

 
  get totalTTC(): number {
    return this.totalHT * 1.2;
  }

}
