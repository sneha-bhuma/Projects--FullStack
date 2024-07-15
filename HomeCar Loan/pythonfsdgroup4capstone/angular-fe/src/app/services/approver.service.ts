import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class ApproverService {
  private loanApiUrl = 'http://127.0.0.1:8000/api/loanapp/';
  private profileApiUrl = 'http://127.0.0.1:8000/api/profile/';
 
  constructor(private http: HttpClient) {}
 
  getLoanData(): Observable<any> {
    return this.http.get<any>(this.loanApiUrl);
  }
 
  getProfileData(): Observable<any> {
    return this.http.get<any>(this.profileApiUrl);
  }
 
  updateStatus(loanId: string, status: string): Observable<any> {
    return this.http.patch<any>(`${this.loanApiUrl}${loanId}/`, { status: status });
  }
}