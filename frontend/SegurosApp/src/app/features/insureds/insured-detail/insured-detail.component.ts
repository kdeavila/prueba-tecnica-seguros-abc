import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { InsuredService } from '../../../core/services/insured.service';
import { Insured } from '../../../core/models/insured.model';

@Component({
  selector: 'app-insured-detail',
  standalone: true,
  imports: [RouterLink, CurrencyPipe, DatePipe],
  template: `
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Back Link -->
      <a routerLink="/asegurados" class="inline-flex items-center text-sm text-gray-500 hover:text-emerald-600 mb-6">
        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
        Volver a la lista
      </a>

      <!-- Loading -->
      @if (loading()) {
        <div class="bg-white border border-gray-200 p-12">
          <div class="flex flex-col items-center justify-center">
            <div class="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
            <p class="mt-4 text-gray-500">Cargando información...</p>
          </div>
        </div>
      }

      <!-- Error -->
      @if (error()) {
        <div class="bg-red-50 border border-red-200 p-6">
          <div class="flex items-center gap-3">
            <svg class="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <p class="text-red-700">{{ error() }}</p>
          </div>
        </div>
      }

      <!-- Detail Card -->
      @if (!loading() && insured()) {
        <div class="bg-white border border-gray-200">
          <!-- Header -->
          <div class="p-6 border-b border-gray-200">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 class="text-2xl font-bold text-gray-900">{{ insured()!.firstName }} {{ insured()!.firstLastName }}</h1>
                <p class="text-gray-500 mt-1">ID: {{ insured()!.identificationNumber }}</p>
              </div>
              <div class="flex gap-3">
                <a [routerLink]="['/asegurados', insured()!.identificationNumber, 'editar']"
                   class="px-4 py-2 bg-emerald-600 text-white hover:bg-emerald-700 transition-colors font-medium">
                  Editar
                </a>
              </div>
            </div>
          </div>

          <!-- Content -->
          <div class="p-6">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <!-- Información Personal -->
              <div class="space-y-4">
                <h2 class="text-sm font-semibold text-gray-500 uppercase tracking-wider">Información Personal</h2>
                
                <div>
                  <p class="text-sm text-gray-500">Nombre Completo</p>
                  <p class="text-gray-900 font-medium">{{ getFullName() }}</p>
                </div>

                <div>
                  <p class="text-sm text-gray-500">Fecha de Nacimiento</p>
                  <p class="text-gray-900 font-medium">{{ insured()!.birthDate | date:'dd/MM/yyyy' }}</p>
                </div>
              </div>

              <!-- Contacto -->
              <div class="space-y-4">
                <h2 class="text-sm font-semibold text-gray-500 uppercase tracking-wider">Contacto</h2>
                
                <div>
                  <p class="text-sm text-gray-500">Teléfono</p>
                  <p class="text-gray-900 font-medium">{{ insured()!.phoneNumber }}</p>
                </div>

                <div>
                  <p class="text-sm text-gray-500">Email</p>
                  <p class="text-emerald-600 font-medium">{{ insured()!.email }}</p>
                </div>
              </div>

              <!-- Seguro -->
              <div class="space-y-4">
                <h2 class="text-sm font-semibold text-gray-500 uppercase tracking-wider">Información del Seguro</h2>
                
                <div>
                  <p class="text-sm text-gray-500">Valor Estimado</p>
                  <p class="text-gray-900 font-medium text-lg">{{ insured()!.estimatedInsuranceValue | currency:'COP':'symbol-narrow':'1.0-0' }}</p>
                </div>
              </div>
            </div>

            <!-- Observaciones -->
            @if (insured()!.notes) {
              <div class="mt-8 pt-6 border-t border-gray-200">
                <h2 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Observaciones</h2>
                <p class="text-gray-700 whitespace-pre-wrap">{{ insured()!.notes }}</p>
              </div>
            }
          </div>
        </div>
      }
    </div>
  `
})
export class InsuredDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private insuredService = inject(InsuredService);

  insured = signal<Insured | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadInsured(parseInt(id, 10));
    }
  }

  private loadInsured(id: number): void {
    this.insuredService.getById(id).subscribe({
      next: (data) => {
        this.insured.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('No se pudo cargar la información del asegurado');
        this.loading.set(false);
      }
    });
  }

  getFullName(): string {
    const i = this.insured();
    if (!i) return '';
    const parts = [i.firstName, i.middleName, i.firstLastName, i.secondLastName];
    return parts.filter(Boolean).join(' ');
  }
}
