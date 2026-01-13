import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <!-- Hero Section -->
    <section class="h-full flex items-center justify-center">
      <div class="max-w-6xl mx-auto text-center px-4 sm:px-6 lg:px-8 py-16">
        <!-- User Icon -->
        <div class="flex justify-center mb-6">
          <div class="size-28 bg-linear-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
            <svg class="size-14 text-white"  viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
              <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
            </svg>
          </div>
        </div>

        <!-- Text Content -->
        <div class="space-y-8">
          <div class="space-y-4">
            <h1 class="text-4xl lg:text-5xl font-bold text-gray-900 max-w-3xl leading-tight">
              Gestiona tus asegurados de manera
              <span class="text-emerald-600">simple y eficiente</span>
            </h1>
            <p class="text-balance text-base text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Plataforma integral para el registro, consulta y administración de potenciales asegurados. Optimiza tus procesos con nuestra solución tecnológica moderna y confiable.
            </p>
          </div>
          
          <!-- Buttons -->
          <div class="flex flex-col justify-center sm:flex-row gap-4">
            <a routerLink="/asegurados/nuevo"
              class="inline-flex items-center justify-center px-8 py-3 bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
              </svg>
              Registrar Asegurado
            </a>
            
            <a routerLink="/asegurados"
              class="inline-flex items-center justify-center px-8 py-3 bg-white text-gray-700 font-semibold border-2 border-gray-300 hover:border-emerald-500 hover:text-emerald-600 transition-colors">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
              </svg>
              Ver Asegurados
            </a>
          </div>
        </div>
      </div>
    </section>
  `
})
export class HomeComponent { }
