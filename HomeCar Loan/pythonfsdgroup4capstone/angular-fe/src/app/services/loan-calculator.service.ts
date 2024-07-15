import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoanType } from '../enums/loan-type.enum';

interface LoanFormData {
  loanType: number;
  loanAmount: number;
  interestAmount: number;
  loanTerm: number;
  termType: string;
}

export interface SimulatedData {
  loanTypeResponse: string;
  principal: number;
  interestPayable: number;
  totalAmountPayable: number;
}

@Injectable({
  providedIn: 'root',
})
export class LoanCalculatorService {
  private readonly apiUrl = 'http://localhost:3000/simulations';

  constructor(private http: HttpClient) {}

  private calculateLoan(formData: LoanFormData): SimulatedData {
    const principal = formData.loanAmount;
    const loanTypeResponse = LoanType[formData.loanType] || '';
    const annualInterestRate = formData.interestAmount / 100;
    const termType = formData.termType === 'year' ? 12 : 1;
    const periods = formData.loanTerm * termType;

    // A = P(1 + r/n)^(nt)
    const interestPayable = Math.round(
      principal * Math.pow(1 + annualInterestRate / termType, periods) -
        principal
    );

    const totalAmountPayable = principal + interestPayable;

    return {
      loanTypeResponse,
      principal,
      interestPayable,
      totalAmountPayable,
    };
  }

  simulateLoan(formData: LoanFormData): Observable<SimulatedData> {
    const simulatedData = this.calculateLoan(formData);
    return this.http.post<SimulatedData>(this.apiUrl, simulatedData);
  }
}