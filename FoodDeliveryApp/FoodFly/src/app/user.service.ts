import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://127.0.0.1:8000/api/users/';
  private loginUrl = 'http://127.0.0.1:8000/api/login/';

  constructor(private http: HttpClient) { }

  registerUser(userData: any): Observable<any> {
    return this.http.post(this.baseUrl, userData);
  }

  fetchUser(userId: number): Observable<any> {
    const url = `${this.baseUrl}${userId}/`;
    return this.http.get(url);
  }

  fetchAllUsers(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  getUserById(id: number): Observable<any> {
    const url = `${this.baseUrl}${id}/`;
    return this.http.get(url);
  }

  fetchToken(username: string, password: string): Observable<any> {
    return this.http.post(this.loginUrl, { username, password }).pipe(
      map((response: any) => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
        }
        return response;
      })
    );
  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`
    });
  }

  getUserDetailsById(id: number): Observable<any> {
    const url = `${this.baseUrl}${id}/`;
    return this.http.get<any>(url, { headers: this.getHeaders() }).pipe(
      map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
      }))
    );
  }
}
