
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Feedback {
  user_id: number;
  rating: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  private apiUrl = 'http://localhost:5000/feedback'; // Replace with your Flask URL

  constructor(private http: HttpClient) { }

  postFeedback(user_id: number, rating: number, name: string): Observable<any> {
    const feedback: Feedback = { user_id, rating, name };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<any>(this.apiUrl, feedback, { headers });
  }
}
