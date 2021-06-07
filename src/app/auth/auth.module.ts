import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SignupComponent } from './pages/signup/signup.component';
import { MaterialModule } from '../material/material.module';
import { LoginDialogComponent } from './components/login-dialog/login-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { BannerComponent } from '../shared/components/banner/banner.component';


@NgModule({
  declarations: [
    SignupComponent,
    LoginDialogComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class AuthModule { }
