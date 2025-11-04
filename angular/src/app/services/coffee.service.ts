import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Coffee } from '../models/coffee';

const API_BASE = 'http://localhost:5000';

@Injectable({ providedIn: 'root' })
export class CoffeeService {
  private http = inject(HttpClient);

  list(): Observable<Coffee[]> {
    return this.http.get<Coffee[]>(`${API_BASE}/api/coffees`);
  }
}
