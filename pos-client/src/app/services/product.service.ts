import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map, Observable } from 'rxjs';
import { Producto } from '../models/producto.model';

const base_url = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  private get headers(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders().set('x-token', token);
  }

  getProducts(): Observable<Producto[]> {
    return this.http.get<{ ok: boolean, products: Producto[] }>(`${base_url}/products`, { headers: this.headers })
      .pipe(map(response => response.products));
  }

  getProductById(id: string): Observable<Producto> {
    return this.http.get<Producto>(`${base_url}/products/${id}`, { headers: this.headers });
  }

  createProduct(product: Producto): Observable<Producto> {
    return this.http.post<Producto>(`${base_url}/products`, product, { headers: this.headers });
  }

  updateProduct(id: string, product: Producto): Observable<Producto> {
    return this.http.put<Producto>(`${base_url}/products/${id}`, product, { headers: this.headers });
  }

  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${base_url}/products/${id}`, { headers: this.headers });
  }
}