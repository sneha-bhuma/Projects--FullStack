import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent implements OnInit {

  contactInfo: any; // Example property

  constructor() { }

  ngOnInit(): void {
    // Example: Initialize contactInfo property
    this.contactInfo = {
      phone: '123-456-7890',
      email: 'contact@example.com',
      address: '123 Main St, City, Country'
    };

    // Other initialization logic can go here
  }

  // Optionally, you can add other methods or logic here

}
