import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SharingService } from '../sharing.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit{
  @Input() selectedstars = 0;
  feedback = { feedback: '', rating: this.selectedstars, patient_name: this.sharingService.patient_name };
  @Input() maxRating = 5;
  maxRatingArray: any = [];
  PreviousmouseSelection = 0;
  status: boolean = false;
  rating : number = 0;
  feedbackHistory : any;

  constructor(private http: HttpClient, 
    private sharingService : SharingService,
    private router: Router,
    private toastr:ToastrService) { }

  onSubmit() {
    console.log('Feedback to submit:', this.feedback);
    this.feedback.rating = this.rating;
    this.http.post('http://127.0.0.1:5000/api/feedback', this.feedback).subscribe({
      next: (response) => {
        console.log('Feedback submitted successfully', response);
        this.toastr.success("Thanks for submitting the feedback")
        this.feedback = { feedback: '', rating: 0 , patient_name : this.sharingService.patient_id}; // Reset form
      },
      error: (error) => {
        console.error('Error submitting feedback', error);
      },
      complete: () => {
        console.log('Feedback submission completed');
      }
    });
    this.getFeedbacks()
  }

  HandleMouseEnter(index: number) {
    this.selectedstars = index + 1;
  }
  HandleMouseLeave() {
    if (this.PreviousmouseSelection !== 0) {
      this.selectedstars = this.PreviousmouseSelection;
    } else {
      this.selectedstars = 0;
    }
  }
  ngOnInit(): void {
    this.maxRatingArray = Array(this.maxRating).fill(0);
    this.getFeedbacks();
  }

  Rating(index: number) {
    this.selectedstars = index + 1;
    this.PreviousmouseSelection = this.selectedstars;
    this.rating = this.selectedstars;
  }

  onCancel() {
    this.router.navigate(['/hello']);
  }

  getFeedbacks(){
    this.http.get('http://127.0.0.1:5000/api/feedback').subscribe({
      next: (response) => {
        console.log('Feedback submitted successfully', response);
        this.feedbackHistory = response; // Reset form
      },
      error: (error) => {
        console.error('Error submitting feedback', error);
      },
      complete: () => {
        console.log('Feedback submission completed');
      }
    });
  }

}
