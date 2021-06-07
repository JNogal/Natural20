import { Component, HostListener, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styles: [
    `
      .loginContainer {
        text-align: center;
        justify-content: center;
        align-items: center;
        padding: 10px;
      }

      .textBox {
        border: 5px solid black;
        border-radius: 7px;
      }
      
      input {
        margin-bottom: 10px;
      }

      button {
        margin-left: 10px;
        margin-right: 10px;
      }
    `
  ]
})
export class LoginDialogComponent implements OnInit {

  loginForm: FormGroup = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  constructor(private dialogRef: MatDialogRef<LoginDialogComponent>,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  signin() {
    this.dialogRef.close(true);
  }

  cancel() {
    this.dialogRef.close();
  }

  async checkUser() {
    const username = (this.loginForm.get('username')?.value);
    const password = (this.loginForm.get('password')?.value);
    this.authService.getUser(username)
      .subscribe(user => {
        if(!user) {
          return;
        }
        if(user.password == password) {
          this.dialogRef.close();
          this.router.navigate([user.id, 'home'])
        } else {
          this.dialogRef.close();
        }
      })
  }
}
