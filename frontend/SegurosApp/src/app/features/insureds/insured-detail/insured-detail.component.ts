import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { InsuredService } from '../../../core/services/insured.service';
import { Insured } from '../../../core/models/insured.model';
import {
  LoadingSpinnerComponent,
  AlertComponent,
  BackLinkComponent
} from '../../../shared/components/ui';

@Component({
  selector: 'app-insured-detail',
  standalone: true,
  imports: [
    RouterLink,
    CurrencyPipe,
    DatePipe,
    LoadingSpinnerComponent,
    AlertComponent,
    BackLinkComponent
  ],
  templateUrl: './insured-detail.component.html'
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
