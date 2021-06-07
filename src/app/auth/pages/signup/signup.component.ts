import { ApplicationRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styles: [
    `
      .bg {
        background-image: url('https://i.pinimg.com/originals/a9/b8/19/a9b8197fa60aedee443d45a17fddc11a.jpg');
        background-repeat: no-repeat;
        background-size: 200%;
      }

      .titleContainer {
        text-align: center;
        justify-content: center;
        align-items: center;
        margin-top: 10px;
      }

      mat-form-field {
        width: 50%;
        margin: 10px;
      }

      .transp-container-title {
        margin-left: 35%;
        transform: translateX(23%);
        width: 20%;
        font-size: 20px;
        background: rgba(255, 255, 255, 0.2);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
        border-radius: 10px;
        padding-top: 15px;
        padding-bottom: 5px;
        border: 2px solid black;
        margin-bottom: 20px;
        background: #4c4848;
      }

      .transp-container {
        margin-left: 35%;
        width: 30%;
        font-size: 20px;
        background: rgba(255, 255, 255, 0.2);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
        border-radius: 10px;
        padding-top: 15px;
        padding-bottom: 5px;
        border: 2px solid black;
        margin-bottom: 20px;
        background: #4c4848
      }
    `,
  ],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: [
      '',
      [Validators.required, Validators.pattern(this.authService.emailPattern)],
    ],
    password: ['', [Validators.required, Validators.minLength(7)]],
    matchPassword: ['', [Validators.required]],
    name: ['', []],
    surname: ['', []],
    age: [, []],
    city: ['', []],
    userImg: ['', []],
  });

  usnmReg: boolean = false;

  get usernameErrorMsg() {
    if (this.signupForm.get('username')?.errors?.required) {
      return 'El nombre de usuario es obligatorio';
    } else if (this.signupForm.get('username')?.errors?.minlength) {
      return 'El nombre de usuario debe contener al menos 3 caracteres';
    } else return;
  }

  get matchPwdErrorMsg() {
    if (this.signupForm.get('matchPassword')?.errors?.required) {
      return 'Debes confirmar la contraseña';
    } else return;
  }

  get pwdErrorMsg() {
    if (this.signupForm.get('password')?.errors?.required) {
      return 'La contraseña es obligatoria';
    } else if (this.signupForm.get('password')?.errors?.minlength) {
      return 'La contraseña debe contener al menos 7 caracteres';
    } else return;
  }

  get emailErrorMsg() {
    if (this.signupForm.get('email')?.errors?.required) {
      return 'El email es obligatorio';
    } else if (this.signupForm.get('email')?.errors?.pattern) {
      return 'El email no tiene el formato adecuado';
    } else return;
  }

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  async createUser() {
    let usnmAlreadyReg: boolean = false;
    await this.authService
      .usnmCannotBeRepeated(this.signupForm.get('username')?.value)
      .then((res) => (usnmAlreadyReg = res));
    if (usnmAlreadyReg) {
      this.showSnackBar('El nombre de usuario ya existe!', 5000)
      return;
    }

    let emailAlreadyReg: boolean = false;
    await this.authService
      .emailCannotBeRepeated(this.signupForm.get('email')?.value)
      .then((res) => (emailAlreadyReg = res));
    if (emailAlreadyReg) {
      this.showSnackBar('El email ya está registrado!', 5000);
      return;
    }

    const pwd = this.signupForm.get('password')?.value;
    const matchPwd = this.signupForm.get('matchPassword')?.value;

    if (this.authService.checkPasswords(pwd, matchPwd) == false) {
      this.showSnackBar('Las contraseñas no coinciden!', 5000);
      return;
    }

    if (
      this.signupForm.get('username')?.errors ||
      this.signupForm.get('email')?.errors ||
      this.signupForm.get('password')?.errors
    ) {
      return;
    }

    let createUser = {
      username: this.signupForm.get('username')?.value,
      email: this.signupForm.get('email')?.value,
      password: this.signupForm.get('password')?.value,
      name: this.signupForm.get('name')?.value,
      surname: this.signupForm.get('surname')?.value,
      age: Number(this.signupForm.get('age')?.value),
      city: this.signupForm.get('city')?.value,
      userImg: this.signupForm.get('userImg')?.value,
    };
    this.authService.createUserPostgres(createUser).subscribe((user) => {
      this.showSnackBar(`${user.username} ha sido creado correctamente`, 3000);
    });
  }

  showSnackBar(msg: string, duration: number) {
    this.snackBar.open(msg, 'Ok!', {
      duration: duration,
    });
  }

  isFieldValid(field: string) {
    return (
      this.signupForm.get(field)?.invalid && this.signupForm.get(field)?.touched
    );
  }
}
