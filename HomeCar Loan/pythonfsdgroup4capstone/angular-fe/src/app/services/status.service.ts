import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  private getUserByEmailApiUrl = 'http://127.0.0.1:8000/api/profile/get-by-email/';
  private loanAppUrl = 'http://127.0.0.1:8000/api/loanapp/get_by_customer_id/';

  constructor() {}

  
  async getEmps(email: string): Promise<any[]> {
    try {
      console.log("sent from component:",email);
      
      const userData = await this.fetchUserData(email);
      const customerId = userData.id;
      console.log("customerId",customerId);
      

      const loanData = await this.fetchLoanData(customerId);
      console.log("userData",userData);
      
      console.log("loanData",loanData);
      

      const joinedData = this.joinData(userData, loanData);
      console.log("joinedData inside service",joinedData);
      
      return joinedData;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }

  private async fetchUserData(email: string): Promise<any> {
    try {
      const response = await fetch(`${this.getUserByEmailApiUrl}?email=${email}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const userData = await response.json();
      console.log("inside fetuser userData",userData);
      
      return userData;
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  }

  private async fetchLoanData(customerId: number): Promise<any[]> {
    try {
      const response = await fetch(`${this.loanAppUrl}?customer_id=${customerId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch loan data');
      }
      const loanData = await response.json();
      console.log("inside fet loanData",loanData);
      return loanData;
    } catch (error) {
      console.error('Error fetching loan data:', error);
      throw error;
    }
  }

  private joinData(userData: any, loanData: any[]): any[] {
    const joinedData = loanData.map((loan: any) => ({
      loan_amount: loan.loan_amount,
      loan_type: loan.loan_type,
      status: loan.status,
      // You can add more fields as needed from userData
      user_name: userData.name,
      user_email: userData.email
    }));
    return joinedData;
  }

  }

  
  

