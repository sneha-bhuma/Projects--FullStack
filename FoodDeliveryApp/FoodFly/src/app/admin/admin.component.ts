import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  addItemForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private http: HttpClient
  ) {
    this.addItemForm = this.formBuilder.group({
      category: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      image: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.addItemForm.valid) {
      const newItem = this.addItemForm.value;
      this.http.post('http://127.0.0.1:8000/api/itemvs/', newItem).subscribe(
        response => {
          this.toastr.success('Item added successfully!');
          this.addItemForm.reset();
        },
        error => {
          this.toastr.error('Failed to add item. Please try again.');
          console.error('Error adding item:', error);
        }
      );
    }
  }
}
