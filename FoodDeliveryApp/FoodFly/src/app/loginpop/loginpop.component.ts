import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../user.service';
import { UserAuthService } from '../user-auth.service';
import { SharingService } from '../sharing.service';

@Component({
  selector: 'app-loginpop',
  templateUrl: './loginpop.component.html',
  styleUrls: ['./loginpop.component.css']
})
export class LoginpopComponent {
  loginForm: FormGroup = this.formBuilder.group({
    UserName: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private userService: UserService,
    private userAuthService: UserAuthService,
    private sharingservice: SharingService,
    public dialogRef: MatDialogRef<LoginpopComponent>
  ) {}

  onSubmit() {
    if (this.loginForm.valid) {
      const enteredUsername = this.loginForm.value.UserName;
      const enteredPassword = this.loginForm.value.password;

      this.userService.fetchToken(enteredUsername, enteredPassword).subscribe(
        (tokenData: any) => {
          if (tokenData && tokenData.token) {
            this.sharingservice.doLogin();
            this.toastr.success('Logged in successfully!');
            this.userAuthService.setToken(tokenData.token);
            this.userAuthService.setUserId(tokenData.user.id); // Assuming user ID is included in the token response
            this.userAuthService.setUserName(tokenData.user.name); // Assuming username is included in the token response
            this.userAuthService.setIsSuperuser(tokenData.user.is_superuser); // Assuming is_superuser is included in the token response

            // Check if the user is a superuser and route accordingly
            if (tokenData.user.is_superuser) {
              this.router.navigate(['/admin']);
            } else {
              this.router.navigate(['/foods']);
            }

            this.dialogRef.close();
          } else {
            this.toastr.error('Invalid username or password.');
          }
        },
        error => {
          this.toastr.error('Error during login.');
          console.error('Login error:', error);
        }
      );
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
