import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FeedbackService } from '../../services/feedback.service';
import { ToastrService } from 'ngx-toastr';

// Define the Feedback interface
interface Feedback {
  uiExperience: number;
  loanStatusExperience: number;
  customerSupportExperience: number;
  email: string;
}

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.css'
})
export class FeedbackComponent {
  //feedbackList: Feedback[] = []; // Array to store fetched feedback data
  stars = [1, 2, 3, 4, 5];
 
  feedback: Feedback = {
    uiExperience: 0,
    loanStatusExperience: 0,
    customerSupportExperience: 0,
    email: '' // New email field
  };


  constructor(private feedbackService: FeedbackService,
    private toastr: ToastrService
  ) {} // Inject FeedbackService here

  // rate(category: keyof Feedback, rating: number) {
  //   this.feedback[category] = rating;
  // }
  rate(category: keyof Feedback, rating: number) {
    // Type assertion to ensure the category is correctly typed
    (this.feedback[category] as number) = rating;
  }

  submitFeedback() {
    this.feedbackService.submitFeedback(this.feedback)
      .subscribe(response => {
        console.log('Feedback submitted', response);
        this.toastr.success('Feedback submitted successfully!', 'Success');
        this.resetFeedback();
      }, error => {
        console.error('Error submitting feedback', error);
        this.toastr.error('Failed to submit feedback', 'Error');
      });
  }

  resetFeedback() {
    this.feedback = {
      uiExperience: 0,
      loanStatusExperience: 0,
      customerSupportExperience: 0,
      email: ''  // Reset email field
    };
  }

  // loadFeedback() {
  //   this.feedbackService.getFeedback()
  //     .subscribe(
  //       (data: Feedback[]) => {
  //         this.feedbackList = data;
  //         console.log('Feedback loaded', this.feedbackList);
  //       },
  //       error => {
  //         console.error('Error fetching feedback', error);
  //       }
  //     );
  // }
}
