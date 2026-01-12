export interface Insured {
  identificationNumber: number;
  firstName: string;
  middleName?: string;
  firstLastName: string;
  secondLastName: string;
  phoneNumber: string;
  email: string;
  birthDate: string;
  estimatedInsuranceValue: number;
  notes?: string;
}

export interface InsuredCreate {
  identificationNumber: number;
  firstName: string;
  middleName?: string;
  firstLastName: string;
  secondLastName: string;
  phoneNumber: string;
  email: string;
  birthDate: string;
  estimatedInsuranceValue: number;
  notes?: string;
}

export interface InsuredUpdate {
  firstName: string;
  middleName?: string;
  firstLastName: string;
  secondLastName: string;
  phoneNumber: string;
  email: string;
  birthDate: string;
  estimatedInsuranceValue: number;
  notes?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}
