import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { InsuredService } from '../../../core/services/insured.service';
import { Insured } from '../../../core/models/insured.model';
import {
  LoadingSpinnerComponent,
  AlertComponent,
  EmptyStateComponent,
  ConfirmModalComponent,
  PaginationComponent,
  PageHeaderComponent,
  SearchBoxComponent,
  ActionButtonsComponent
} from '../../../shared/components/ui';

@Component({
  selector: 'app-insured-list',
  standalone: true,
  imports: [
    FormsModule,
    CurrencyPipe,
    LoadingSpinnerComponent,
    AlertComponent,
    EmptyStateComponent,
    ConfirmModalComponent,
    PaginationComponent,
    PageHeaderComponent,
    SearchBoxComponent,
    ActionButtonsComponent
  ],
  templateUrl: './insured-list.component.html'
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
      error: () => {
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

    this.loading.set(true);
    this.error.set(null);
    this.isSearching.set(true);

    this.insuredService.searchByIdentification(term).subscribe({
      next: (insureds) => {
        this.insureds.set(insureds);
        this.loading.set(false);
      },
      error: () => {
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
      error: () => {
        this.deleting.set(false);
        this.error.set('Error al eliminar el asegurado. Por favor, intenta de nuevo.');
      }
    });
  }
}
