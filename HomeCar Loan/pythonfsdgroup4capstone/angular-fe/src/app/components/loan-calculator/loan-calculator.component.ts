import { Component, OnInit } from '@angular/core';
import { Chart, ChartDataset } from 'chart.js';

@Component({
  selector: 'app-loan-calculator',
  templateUrl: './loan-calculator.component.html',
  styleUrls: ['./loan-calculator.component.css']
})
export class LoanCalculatorComponent implements OnInit {
  loanAmount: number = 0; // Default value for demonstration
  interestRate: number = 0; // Default value for demonstration
  loanTenure: number = 0; // Default value for demonstration

  emi: number = 0;
  totalInterestPayable: number = 0;
  totalPayment: number = 0;

  emiDetails: any[] = [];

  calculateEMI() {
    const principal = this.loanAmount;
    const monthlyInterestRate = this.interestRate / (12 * 100);
    const numberOfMonths = this.loanTenure * 12;

    this.emi = (principal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfMonths)) /
      (Math.pow(1 + monthlyInterestRate, numberOfMonths) - 1);

    this.totalPayment = this.emi * numberOfMonths;
    this.totalInterestPayable = this.totalPayment - principal;

    this.calculateEMIDetails(principal, monthlyInterestRate, numberOfMonths);
  }

  calculateEMIDetails(principal: number, monthlyInterestRate: number, numberOfMonths: number) {
    let balance = principal;
    this.emiDetails = [];
    for (let month = 1; month <= numberOfMonths; month++) {
      const interest = balance * monthlyInterestRate;
      const principalComponent = this.emi - interest;
      balance -= principalComponent;

      this.emiDetails.push({
        month,
        emi: this.emi,
        principalComponent,
        interest,
        remainingBalance: balance < 0 ? 0 : balance
      });
    }
  }

  validateAndCalculateEMI() {
    if (this.loanAmount < 0) {
      this.loanAmount = 0;
    }
    if (this.interestRate < 0) {
      this.interestRate = 0;
    } else if (this.interestRate > 20) {
      this.interestRate = 20;
    }
    if (this.loanTenure < 0) {
      this.loanTenure = 0;
    } else if (this.loanTenure > 30) {
      this.loanTenure = 30;
    }
    this.calculateEMI();
  }

  ngOnInit() {
    this.calculateEMI(); // Calculate EMI initially with default values
  }
}
