import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


// Define the Feedback interface
interface Feedback {
  uiExperience: number;
  loanStatusExperience: number;
  customerSupportExperience: number;
  email: string;  // Added email field
}

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private flaskapiUrl = 'http://127.0.0.1:5000/feedback';


  constructor(private http: HttpClient) { }

  // Method to submit feedback
  submitFeedback(feedback: Feedback): Observable<any> {
    return this.http.post(this.flaskapiUrl, feedback);
  }

  // Optionally, a method to get feedback
  // getFeedback(): Observable<Feedback[]> {
  //   return this.http.get<Feedback[]>(this.apiUrl);
  // }
}
