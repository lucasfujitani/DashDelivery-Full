import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VerificationService {

  private url = 'http://localhost:8090/verification';

  constructor(private http: HttpClient) { }

  sendCode(email: string): Observable<string> {
    return this.http.post(`${this.url}/send-code`, { email }, { responseType: 'text' });
  }

  validateCode(email: string, codigo: string): Observable<string> {
    return this.http.post(`${this.url}/validate-code`, { email, codigo }, { responseType: 'text' });
  }
}

