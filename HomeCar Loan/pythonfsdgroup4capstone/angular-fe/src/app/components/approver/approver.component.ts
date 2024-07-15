import { Component, OnInit } from '@angular/core';
import { ApproverService } from '../../services/approver.service';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-approver',
  templateUrl: './approver.component.html',
  styleUrls: ['./approver.component.css']
})
export class ApproverComponent implements OnInit {
  loanData: any[] = [];
  filteredLoanData: any[] = [];
  searchTerm: string = '';

  constructor(
    private approverService: ApproverService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.toastr.info('Fetching data...', 'Please wait');
    forkJoin({
      loans: this.approverService.getLoanData(),
      profiles: this.approverService.getProfileData()
    }).subscribe(
      ({ loans, profiles }) => {
        const customerProfiles = profiles.filter((profile: any) => profile.user_type === 'customer');
        this.loanData = loans.map((loan: any) => {
          const profile = customerProfiles.find((p: any) => p.id === loan.customer_id);
          // const monthlyIncome = profile ? profile.monthly_income : 0;
          const monthlyIncome=profile.monthly_income;
          // const annualIncome = monthlyIncome * 12;
          const age = profile ? this.calculateAge(profile.date_of_birth) : 0;

          let loanStatus = 'Auto Rejected';
          if (age >= 18) {
            loanStatus = loan.loan_amount < 70 * monthlyIncome ? 'Auto Approved' : 'Auto Rejected';
          }

          return {
            ...loan,
            monthly_income: monthlyIncome,
            customer_name: profile ? profile.name : 'Unknown',
            status: loan.status || 'Pending',
            autovalidation: loanStatus,
            tempStatus: loan.status || 'Pending' // Temporary status for the dropdown
          };
        });
        this.filteredLoanData = [...this.loanData]; // Initialize filtered data
        this.applySearch(); // Apply initial search
        this.toastr.success('Data fetched successfully', 'Success');
      },
      error => {
        this.toastr.error('Failed to fetch data', 'Error');
      }
    );
  }

 //updating status in loan table 
  updateStatus(loanId: string, status: string): void {
    this.approverService.updateStatus(loanId, status).subscribe(
      response => {
        this.toastr.success('Status updated successfully', 'Success');
      },
      error => {
        this.toastr.error('Failed to update status', 'Error');
      }
    );
  }

  //submit status to the api
  submitStatus(loan: any): void {
    this.updateStatus(loan.id, loan.tempStatus);
    loan.status = loan.tempStatus; // Update the actual status after submission
  }

  //name,loan type,status filter
  applySearch(): void {
    const searchTerm = this.searchTerm.toLowerCase();
    this.filteredLoanData = this.loanData.filter(loan =>
      loan.customer_name.toLowerCase().includes(searchTerm) ||
      loan.loan_type.toLowerCase().includes(searchTerm) ||
      loan.status.toLowerCase().includes(searchTerm)
    );
  }

  //auto validation logic for status approval
  private calculateAge(dateOfBirth: string): number {
    const dob = new Date(dateOfBirth);
    const diffMs = Date.now() - dob.getTime();
    const ageDt = new Date(diffMs); //conver to

    return Math.abs(ageDt.getUTCFullYear() - 1970);
  }
}

