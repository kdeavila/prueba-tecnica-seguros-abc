import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InsuredService } from '../../../core/services/insured.service';

@Component({
  selector: 'app-insured-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="mb-8">
        <a routerLink="/asegurados" class="inline-flex items-center text-sm text-gray-500 hover:text-emerald-600 mb-4">
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
          Volver a la lista
        </a>
        <h1 class="text-2xl font-bold text-gray-900">
          {{ isEditMode() ? 'Editar Asegurado' : 'Registrar Nuevo Asegurado' }}
        </h1>
        <p class="text-gray-500 mt-1">
          {{ isEditMode() ? 'Actualiza la información del asegurado' : 'Completa el formulario para registrar un nuevo asegurado' }}
        </p>
      </div>

      <!-- Error Alert -->
      @if (error()) {
        <div class="mb-6 p-4 bg-red-50 border border-red-200">
          <div class="flex items-center gap-3">
            <svg class="w-5 h-5 text-red-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <p class="text-red-700 text-sm">{{ error() }}</p>
          </div>
        </div>
      }

      <!-- Success Alert -->
      @if (success()) {
        <div class="mb-6 p-4 bg-emerald-50 border border-emerald-200">
          <div class="flex items-center gap-3">
            <svg class="w-5 h-5 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <p class="text-emerald-700 text-sm">{{ success() }}</p>
          </div>
        </div>
      }

      <!-- Loading -->
      @if (loadingData()) {
        <div class="bg-white border border-gray-200 p-12">
          <div class="flex flex-col items-center justify-center">
            <div class="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
            <p class="mt-4 text-gray-500">Cargando datos...</p>
          </div>
        </div>
      }

      <!-- Form -->
      @if (!loadingData()) {
        <form [formGroup]="form" (ngSubmit)="onSubmit()" class="bg-white border border-gray-200 p-6 lg:p-8">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <!-- Número de Identificación -->
            <div class="lg:col-span-1">
              <label for="identificationNumber" class="block text-sm font-medium text-gray-700 mb-2">
                Número de Identificación <span class="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="identificationNumber"
                formControlName="identificationNumber"
                [readonly]="isEditMode()"
                [class.bg-gray-100]="isEditMode()"
                class="w-full px-4 py-2.5 border border-gray-300 focus:ring-0 focus:border-emerald-500 outline-none transition-colors"
                placeholder="1234567890"
              />
              @if (form.get('identificationNumber')?.invalid && submitted()) {
                <p class="mt-1 text-sm text-red-500">
                  @if (form.get('identificationNumber')?.errors?.['required']) {
                    El número de identificación es requerido
                  } @else if (form.get('identificationNumber')?.errors?.['min']) {
                    Debe ser un valor positivo
                  }
                </p>
              }
            </div>

            <!-- Primer Nombre -->
            <div>
              <label for="firstName" class="block text-sm font-medium text-gray-700 mb-2">
                Primer Nombre <span class="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                formControlName="firstName"
                class="w-full px-4 py-2.5 border border-gray-300 focus:ring-0 focus:border-emerald-500 outline-none transition-colors"
                placeholder="Juan"
              />
              @if (form.get('firstName')?.invalid && submitted()) {
                <p class="mt-1 text-sm text-red-500">El primer nombre es requerido</p>
              }
            </div>

            <!-- Segundo Nombre -->
            <div>
              <label for="middleName" class="block text-sm font-medium text-gray-700 mb-2">
                Segundo Nombre
              </label>
              <input
                type="text"
                id="middleName"
                formControlName="middleName"
                class="w-full px-4 py-2.5 border border-gray-300 focus:ring-0 focus:border-emerald-500 outline-none transition-colors"
                placeholder="Carlos"
              />
            </div>

            <!-- Primer Apellido -->
            <div>
              <label for="firstLastName" class="block text-sm font-medium text-gray-700 mb-2">
                Primer Apellido <span class="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="firstLastName"
                formControlName="firstLastName"
                class="w-full px-4 py-2.5 border border-gray-300 focus:ring-0 focus:border-emerald-500 outline-none transition-colors"
                placeholder="Pérez"
              />
              @if (form.get('firstLastName')?.invalid && submitted()) {
                <p class="mt-1 text-sm text-red-500">El primer apellido es requerido</p>
              }
            </div>

            <!-- Segundo Apellido -->
            <div>
              <label for="secondLastName" class="block text-sm font-medium text-gray-700 mb-2">
                Segundo Apellido <span class="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="secondLastName"
                formControlName="secondLastName"
                class="w-full px-4 py-2.5 border border-gray-300 focus:ring-0 focus:border-emerald-500 outline-none transition-colors"
                placeholder="García"
              />
              @if (form.get('secondLastName')?.invalid && submitted()) {
                <p class="mt-1 text-sm text-red-500">El segundo apellido es requerido</p>
              }
            </div>

            <!-- Teléfono -->
            <div>
              <label for="phoneNumber" class="block text-sm font-medium text-gray-700 mb-2">
                Teléfono de Contacto <span class="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phoneNumber"
                formControlName="phoneNumber"
                class="w-full px-4 py-2.5 border border-gray-300 focus:ring-0 focus:border-emerald-500 outline-none transition-colors"
                placeholder="+57 300 123 4567"
              />
              @if (form.get('phoneNumber')?.invalid && submitted()) {
                <p class="mt-1 text-sm text-red-500">El teléfono es requerido</p>
              }
            </div>

            <!-- Email -->
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                Email <span class="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                formControlName="email"
                class="w-full px-4 py-2.5 border border-gray-300 focus:ring-0 focus:border-emerald-500 outline-none transition-colors"
                placeholder="correo@ejemplo.com"
              />
              @if (form.get('email')?.invalid && submitted()) {
                <p class="mt-1 text-sm text-red-500">
                  @if (form.get('email')?.errors?.['required']) {
                    El email es requerido
                  } @else if (form.get('email')?.errors?.['email']) {
                    El email no es válido
                  }
                </p>
              }
            </div>

            <!-- Fecha de Nacimiento -->
            <div>
              <label for="birthDate" class="block text-sm font-medium text-gray-700 mb-2">
                Fecha de Nacimiento <span class="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="birthDate"
                formControlName="birthDate"
                [max]="maxDate"
                class="w-full px-4 py-2.5 border border-gray-300 focus:ring-0 focus:border-emerald-500 outline-none transition-colors"
              />
              @if (form.get('birthDate')?.invalid && submitted()) {
                <p class="mt-1 text-sm text-red-500">La fecha de nacimiento es requerida</p>
              }
            </div>

            <!-- Valor Estimado del Seguro -->
            <div>
              <label for="estimatedInsuranceValue" class="block text-sm font-medium text-gray-700 mb-2">
                Valor Estimado del Seguro (COP) <span class="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="estimatedInsuranceValue"
                formControlName="estimatedInsuranceValue"
                class="w-full px-4 py-2.5 border border-gray-300 focus:ring-0 focus:border-emerald-500 outline-none transition-colors"
                placeholder="5000000"
              />
              @if (form.get('estimatedInsuranceValue')?.invalid && submitted()) {
                <p class="mt-1 text-sm text-red-500">
                  @if (form.get('estimatedInsuranceValue')?.errors?.['required']) {
                    El valor estimado es requerido
                  } @else if (form.get('estimatedInsuranceValue')?.errors?.['min']) {
                    Debe ser un valor positivo
                  }
                </p>
              }
            </div>

            <!-- Observaciones -->
            <div class="md:col-span-2 lg:col-span-4">
              <label for="notes" class="block text-sm font-medium text-gray-700 mb-2">
                Observaciones
              </label>
              <textarea
                id="notes"
                formControlName="notes"
                rows="4"
                class="w-full px-4 py-2.5 border border-gray-300 focus:ring-0 focus:border-emerald-500 outline-none transition-colors resize-none"
                placeholder="Notas adicionales sobre el asegurado..."
              ></textarea>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
            <a
              routerLink="/asegurados"
              class="px-6 py-2.5 text-center text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors font-medium">
              Cancelar
            </a>
            <button
              type="submit"
              [disabled]="form.invalid || submitting()"
              class="px-6 py-2.5 text-white bg-emerald-600 hover:bg-emerald-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed">
              @if (submitting()) {
                <span class="flex items-center justify-center">
                  <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {{ isEditMode() ? 'Actualizando...' : 'Registrando...' }}
                </span>
              } @else {
                {{ isEditMode() ? 'Actualizar Asegurado' : 'Registrar Asegurado' }}
              }
            </button>
          </div>
        </form>
      }
    </div>
  `
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
      error: (err) => {
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
