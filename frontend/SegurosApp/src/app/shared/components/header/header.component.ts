import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="bg-white border-b border-gray-200">
      <nav class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
            <a routerLink="/" class="flex items-center space-x-2">
              <span class="text-xl font-bold text-emerald-600">SEGUROS ABC</span>
            </a>

          <div class="hidden sm:flex sm:items-center sm:space-x-1">
            <a routerLink="/"
               routerLinkActive="bg-emerald-50 text-emerald-700"
               [routerLinkActiveOptions]="{ exact: true }"
               class="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors">
              Inicio
            </a>
            <a routerLink="/asegurados"
               routerLinkActive="bg-emerald-50 text-emerald-700"
               class="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors">
              Asegurados
            </a>
            <a routerLink="/asegurados/nuevo"
               routerLinkActive="bg-emerald-50 text-emerald-700"
               class="ml-2 px-4 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 transition-colors">
             + Nuevo Asegurado
            </a>
          </div>

          <!-- Mobile menu button -->
          <div class="flex items-center sm:hidden">
            <button (click)="toggleMobileMenu()" type="button"
                    class="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100">
              <svg class="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                @if (!mobileMenuOpen) {
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                }
                @if (mobileMenuOpen) {
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                }
              </svg>
            </button>
          </div>
        </div>

        <!-- Mobile menu -->
        @if (mobileMenuOpen) {
          <div class="sm:hidden pb-4">
            <div class="flex flex-col space-y-2">
              <a routerLink="/"
                 (click)="closeMobileMenu()"
                 routerLinkActive="bg-emerald-50 text-emerald-700"
                 [routerLinkActiveOptions]="{ exact: true }"
                 class="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100">
                Inicio
              </a>
              <a routerLink="/asegurados"
                 (click)="closeMobileMenu()"
                 routerLinkActive="bg-emerald-50 text-emerald-700"
                 class="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100">
                Asegurados
              </a>
              <a routerLink="/asegurados/nuevo"
                 (click)="closeMobileMenu()"
                 class="px-4 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 text-center">
                + Nuevo Asegurado
              </a>
            </div>
          </div>
        }
      </nav>
    </header>
  `
})
export class HeaderComponent {
  mobileMenuOpen = false;

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
  }
}
