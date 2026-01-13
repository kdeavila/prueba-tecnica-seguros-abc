import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InsuredService } from '../../../core/services/insured.service';
import {
  LoadingSpinnerComponent,
  AlertComponent,
  BackLinkComponent,
  PageHeaderComponent
} from '../../../shared/components/ui';

@Component({
  selector: 'app-insured-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    LoadingSpinnerComponent,
    AlertComponent,
    BackLinkComponent,
    PageHeaderComponent
  ],
  templateUrl: './insured-form.component.html'
})
export class InsuredFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private insuredService = inject(InsuredService);

  form!: FormGroup;
  isEditMode = signal(false);
  loadingData = signal(false);
  submitting = signal(false);
  submitted = signal(false);
  error = signal<string | null>(null);
  success = signal<string | null>(null);
  maxDate = new Date().toISOString().split('T')[0];

  private insuredId: number | null = null;

  ngOnInit(): void {
    this.initForm();
    this.checkEditMode();
  }

  private initForm(): void {
    this.form = this.fb.group({
      identificationNumber: [null, [Validators.required, Validators.min(1)]],
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      middleName: ['', [Validators.maxLength(50)]],
      firstLastName: ['', [Validators.required, Validators.maxLength(50)]],
      secondLastName: ['', [Validators.required, Validators.maxLength(50)]],
      phoneNumber: ['', [Validators.required, Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
      birthDate: ['', [Validators.required]],
      estimatedInsuranceValue: [null, [Validators.required, Validators.min(1)]],
      notes: ['', [Validators.maxLength(500)]]
    });
  }

  private checkEditMode(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.insuredId = parseInt(id, 10);
      this.isEditMode.set(true);
      this.loadInsuredData();
    }
  }

  private loadInsuredData(): void {
    if (!this.insuredId) return;

    this.loadingData.set(true);
    this.insuredService.getById(this.insuredId).subscribe({
      next: (insured) => {
        this.form.patchValue({
          identificationNumber: insured.identificationNumber,
          firstName: insured.firstName,
          middleName: insured.middleName || '',
          firstLastName: insured.firstLastName,
          secondLastName: insured.secondLastName,
          phoneNumber: insured.phoneNumber,
          email: insured.email,
          birthDate: insured.birthDate,
          estimatedInsuranceValue: insured.estimatedInsuranceValue,
          notes: insured.notes || ''
        });
        this.loadingData.set(false);
      },
      error: () => {
        this.error.set('Error al cargar los datos del asegurado');
        this.loadingData.set(false);
      }
    });
  }

  onSubmit(): void {
    this.submitted.set(true);
    
    if (this.form.invalid) {
      return;
    }

    this.error.set(null);
    this.success.set(null);
    this.submitting.set(true);

    const formValue = this.form.value;

    if (this.isEditMode() && this.insuredId) {
      const updateData = {
        firstName: formValue.firstName,
        middleName: formValue.middleName || null,
        firstLastName: formValue.firstLastName,
        secondLastName: formValue.secondLastName,
        phoneNumber: formValue.phoneNumber,
        email: formValue.email,
        birthDate: formValue.birthDate,
        estimatedInsuranceValue: formValue.estimatedInsuranceValue,
        notes: formValue.notes || null
      };

      this.insuredService.update(this.insuredId, updateData).subscribe({
        next: () => {
          this.success.set('Asegurado actualizado exitosamente');
          this.submitting.set(false);
          setTimeout(() => this.router.navigate(['/asegurados']), 1500);
        },
        error: (err) => {
          this.handleError(err);
          this.submitting.set(false);
        }
      });
    } else {
      const createData = {
        identificationNumber: formValue.identificationNumber,
        firstName: formValue.firstName,
        middleName: formValue.middleName || null,
        firstLastName: formValue.firstLastName,
        secondLastName: formValue.secondLastName,
        phoneNumber: formValue.phoneNumber,
        email: formValue.email,
        birthDate: formValue.birthDate,
        estimatedInsuranceValue: formValue.estimatedInsuranceValue,
        notes: formValue.notes || null
      };

      this.insuredService.create(createData).subscribe({
        next: () => {
          this.success.set('Asegurado registrado exitosamente');
          this.submitting.set(false);
          setTimeout(() => this.router.navigate(['/asegurados']), 1500);
        },
        error: (err) => {
          this.handleError(err);
          this.submitting.set(false);
        }
      });
    }
  }

  private handleError(err: any): void {
    if (err.status === 409) {
      this.error.set(err.error?.message || 'Ya existe un registro con esos datos');
    } else if (err.status === 400) {
      this.error.set(err.error?.message || 'Datos inválidos. Verifica la información');
    } else {
      this.error.set('Error al procesar la solicitud. Intenta de nuevo');
    }
  }
}
