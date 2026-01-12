import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { InsuredService } from '../../../core/services/insured.service';
import { Insured } from '../../../core/models/insured.model';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-insured-list',
  standalone: true,
  imports: [RouterLink, FormsModule, CurrencyPipe, DatePipe],
  template: `
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="bg-white border border-gray-200 p-6 mb-6">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Gestión de Asegurados</h1>
            <p class="text-gray-500 mt-1">Administra la información de todos los asegurados</p>
          </div>

          <!-- Search -->
          <div class="flex flex-col sm:flex-row gap-3">
            <div class="relative">
              <input
                type="text"
                [(ngModel)]="searchTerm"
                (keyup.enter)="search()"
                placeholder="Buscar por número de identificación..."
                class="w-full sm:w-80 pl-10 pr-4 py-2.5 border border-gray-300 focus:ring-0 focus:border-emerald-500 outline-none transition-colors"
              />
              <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </div>
            <button
              (click)="search()"
              class="px-4 py-2.5 bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors font-medium">
              Buscar
            </button>
            @if (isSearching()) {
              <button
                (click)="clearSearch()"
                class="px-4 py-2.5 bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors font-medium">
                Limpiar
              </button>
            }
          </div>
        </div>
      </div>

      <!-- Loading -->
      @if (loading()) {
        <div class="bg-white border border-gray-200 p-12">
          <div class="flex flex-col items-center justify-center">
            <div class="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
            <p class="mt-4 text-gray-500">Cargando asegurados...</p>
          </div>
        </div>
      }

      <!-- Error -->
      @if (error()) {
        <div class="bg-red-50 border border-red-200 p-6 mb-6">
          <div class="flex items-center gap-3">
            <svg class="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <p class="text-red-700">{{ error() }}</p>
          </div>
        </div>
      }

      <!-- Table -->
      @if (!loading() && insureds().length > 0) {
        <div class="bg-white border border-gray-200 overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Identificación</th>
                  <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Nombre Completo</th>
                  <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Teléfono</th>
                  <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
                  <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Fecha Nacimiento</th>
                  <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Valor Seguro</th>
                  <th class="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                @for (insured of insureds(); track insured.identificationNumber) {
                  <tr class="hover:bg-gray-50 transition-colors">
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="text-sm font-medium text-gray-900">{{ insured.identificationNumber }}</span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="text-sm text-gray-900">{{ getFullName(insured) }}</span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="text-sm text-gray-600">{{ insured.phoneNumber }}</span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="text-sm text-emerald-600">{{ insured.email }}</span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="text-sm text-gray-600">{{ insured.birthDate | date:'dd/MM/yyyy' }}</span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="text-sm font-medium text-gray-900">{{ insured.estimatedInsuranceValue | currency:'COP':'symbol-narrow':'1.0-0' }}</span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center justify-center gap-2">
                        <a [routerLink]="['/asegurados', insured.identificationNumber, 'editar']"
                           class="p-2 text-emerald-600 hover:bg-emerald-50 transition-colors"
                           title="Editar">
                          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                          </svg>
                        </a>
                        <button
                          (click)="confirmDelete(insured)"
                          class="p-2 text-red-600 hover:bg-red-50 transition-colors"
                          title="Eliminar">
                          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>

          <!-- Pagination -->
          @if (!isSearching() && totalPages() > 1) {
            <div class="px-6 py-4 border-t border-gray-200 bg-gray-50">
              <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
                <p class="text-sm text-gray-600">
                  Mostrando página {{ currentPage() }} de {{ totalPages() }} ({{ totalCount() }} registros)
                </p>
                <div class="flex items-center gap-2">
                  <button
                    (click)="goToPage(currentPage() - 1)"
                    [disabled]="currentPage() <= 1"
                    class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                    Anterior
                  </button>
                  <button
                    (click)="goToPage(currentPage() + 1)"
                    [disabled]="currentPage() >= totalPages()"
                    class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                    Siguiente
                  </button>
                </div>
              </div>
            </div>
          }
        </div>
      }

      <!-- Empty State -->
      @if (!loading() && insureds().length === 0 && !error()) {
        <div class="bg-white border border-gray-200 p-12">
          <div class="flex flex-col items-center justify-center text-center">
            <div class="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
              <svg class="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
            </div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">
              {{ isSearching() ? 'No se encontraron resultados' : 'No hay asegurados registrados' }}
            </h3>
            <p class="text-gray-500 mb-6">
              {{ isSearching() ? 'Intenta con otro número de identificación' : 'Comienza registrando tu primer asegurado' }}
            </p>
            @if (!isSearching()) {
              <a routerLink="/asegurados/nuevo"
                 class="inline-flex items-center px-4 py-2 bg-emerald-600 text-white hover:bg-emerald-700 transition-colors">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                </svg>
                Registrar Asegurado
              </a>
            }
          </div>
        </div>
      }

      <!-- Delete Confirmation Modal -->
      @if (showDeleteModal()) {
        <div class="fixed inset-0 z-50 overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4">
            <div class="fixed inset-0 bg-black/50 transition-opacity" (click)="cancelDelete()"></div>
            <div class="relative bg-white max-w-md w-full p-6">
              <div class="mb-4">
                <h3 class="text-lg font-semibold text-gray-900">Eliminar asegurado</h3>
                <p class="text-sm text-gray-500">Esta acción no se puede deshacer</p>
              </div>
              <p class="text-gray-600 mb-6">
                ¿Estás seguro de que deseas eliminar a <span class="font-semibold">{{ getFullName(insuredToDelete()!) }}</span>?
              </p>
              <div class="flex justify-end gap-3">
                <button
                  (click)="cancelDelete()"
                  class="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors font-medium">
                  Cancelar
                </button>
                <button
                  (click)="deleteInsured()"
                  [disabled]="deleting()"
                  class="px-4 py-2 text-white bg-red-600 hover:bg-red-700 transition-colors font-medium disabled:opacity-50">
                  {{ deleting() ? 'Eliminando...' : 'Eliminar' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  `
})
export class InsuredListComponent implements OnInit {
  private insuredService = inject(InsuredService);

  insureds = signal<Insured[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);
  searchTerm = '';
  isSearching = signal(false);

  currentPage = signal(1);
  pageSize = 10;
  totalCount = signal(0);
  totalPages = signal(0);

  showDeleteModal = signal(false);
  insuredToDelete = signal<Insured | null>(null);
  deleting = signal(false);

  ngOnInit(): void {
    this.loadInsureds();
  }

  loadInsureds(): void {
    this.loading.set(true);
    this.error.set(null);
    this.isSearching.set(false);

    this.insuredService.getAll(this.currentPage(), this.pageSize).subscribe({
      next: (response) => {
        this.insureds.set(response.items);
        this.totalCount.set(response.totalCount);
        this.totalPages.set(response.totalPages);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Error al cargar los asegurados. Por favor, intenta de nuevo.');
        this.loading.set(false);
      }
    });
  }

  search(): void {
    const term = this.searchTerm.trim();
    if (!term) {
      this.loadInsureds();
      return;
    }

    const identificationNumber = parseInt(term, 10);
    if (isNaN(identificationNumber)) {
      this.error.set('Por favor ingresa un número de identificación válido');
      return;
    }

    this.loading.set(true);
    this.error.set(null);
    this.isSearching.set(true);

    this.insuredService.searchByIdentification(identificationNumber).subscribe({
      next: (insureds) => {
        this.insureds.set(insureds);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Error al buscar. Por favor, intenta de nuevo.');
        this.loading.set(false);
      }
    });
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.currentPage.set(1);
    this.loadInsureds();
  }

  goToPage(page: number): void {
    this.currentPage.set(page);
    this.loadInsureds();
  }

  getFullName(insured: Insured): string {
    const parts = [insured.firstName, insured.middleName, insured.firstLastName, insured.secondLastName];
    return parts.filter(Boolean).join(' ');
  }

  confirmDelete(insured: Insured): void {
    this.insuredToDelete.set(insured);
    this.showDeleteModal.set(true);
  }

  cancelDelete(): void {
    this.showDeleteModal.set(false);
    this.insuredToDelete.set(null);
  }

  deleteInsured(): void {
    const insured = this.insuredToDelete();
    if (!insured) return;

    this.deleting.set(true);

    this.insuredService.delete(insured.identificationNumber).subscribe({
      next: () => {
        this.showDeleteModal.set(false);
        this.insuredToDelete.set(null);
        this.deleting.set(false);
        this.loadInsureds();
      },
      error: (err) => {
        this.deleting.set(false);
        this.error.set('Error al eliminar el asegurado. Por favor, intenta de nuevo.');
      }
    });
  }
}
