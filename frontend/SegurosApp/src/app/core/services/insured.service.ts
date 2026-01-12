import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Insured, InsuredCreate, InsuredUpdate, PaginatedResponse } from '../models/insured.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InsuredService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/insureds`;

  getAll(pageNumber: number = 1, pageSize: number = 10): Observable<PaginatedResponse<Insured>> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<PaginatedResponse<Insured>>(this.apiUrl, { params });
  }

  getById(id: number): Observable<Insured> {
    return this.http.get<Insured>(`${this.apiUrl}/${id}`);
  }

  searchByIdentification(searchTerm: string): Observable<Insured[]> {
    return this.http.get<Insured[]>(`${this.apiUrl}/search/${searchTerm}`);
  }

  create(insured: InsuredCreate): Observable<Insured> {
    return this.http.post<Insured>(this.apiUrl, insured);
  }

  update(id: number, insured: InsuredUpdate): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, insured);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
