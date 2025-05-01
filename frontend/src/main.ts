// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';         // <-- HttpClient
//import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { ReactiveFormsModule } from '@angular/forms';             // <-- ReactiveForms
import { importProvidersFrom } from '@angular/core';

bootstrapApplication(AppComponent, {
  providers: [
    // Pour HttpClientModule
    provideHttpClient(),
    // Pour ReactiveFormsModule
    importProvidersFrom(ReactiveFormsModule)
    // Si tu utilises le Router :
    //provideRouter(/* tes routes ici */)
  ]
})
  .catch(err => console.error(err));
