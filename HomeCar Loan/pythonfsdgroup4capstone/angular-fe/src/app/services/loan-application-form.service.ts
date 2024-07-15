//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoanApplicationFormService {

  private userProfileApiUrl = 'http://127.0.0.1:8000/api/profile/';
  private loanApplicationApiUrl = 'http://127.0.0.1:8000/api/loanapp/';
  private getUserByEmailApiUrl = 'http://127.0.0.1:8000/api/profile/get-by-email/';//ensure code to be written in views
  private getLoanByUserIdApiUrl = 'http://127.0.0.1:8000/api/loanapp/get_by_customer_id'; // New endpoint


  constructor() {}

//from the front end can able to store email is only,can't have user id , this is only for grabbing user id in component
  getUserByEmail(email: string): Promise<any> {
    console.log("before get email",email);
    
    return fetch(`${this.getUserByEmailApiUrl}?email=${email}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      if (!data.id) {
        throw new Error('User not found');
      }
      return data; // Assuming the API returns the user data directly
    })
    .catch(error => {
      console.error('Error fetching user by email:', error);
      throw error;
    });
  }

//customer id passing as userId here, updating rest of the user data
  updateUserProfile(userId: number, userData: any): Promise<any> {
    console.log("before put userData,userId",userData,userId);
    
    return fetch(`${this.userProfileApiUrl}${userId}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error updating user profile:', error);
      throw error;
    });
  }

  submitLoanApplication(loanData: any): Promise<any> {
    console.log("before post loanData",loanData);
    
    return fetch(this.loanApplicationApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loanData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error submitting loan application:', error);
      throw error;
    });
  }
  getLoanDetailsByUserId(userId: number): Promise<any> { // New method
    console.log("Fetching loan details for user ID:", userId);
    
    return fetch(`${this.getLoanByUserIdApiUrl}?customer_id=${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error fetching loan details by user ID:', error);
      throw error;
    });
  }
}