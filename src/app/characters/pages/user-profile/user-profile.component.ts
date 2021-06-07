import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { UserDto } from 'src/app/auth/interfaces/user.interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styles: [
    `
      .profile-img {
        float: left;
        max-width: 200px;
        max-height: 200px;
      }

      .profile-img img {
        border-radius: 50%;
        min-height: 200px;
        min-width: 200px;
        max-height: 200px;
        max-width: 200px;
        border: 4px solid #fff;
        box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
        position: absolute;
        left: 50px;
        background: #fff;
        margin-top: 20px;
      }

      .profile-header {
        transform: translateX(11%);
        height: 250px;
        width: 80%;
        border-radius: 10px;
        border: 2px solid black;
        background: rgba(255, 255, 255, 0.2);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
      }

      .profile-header h1 {
        font-size: 50px;
        margin-left: 300px;
        margin-top: 100px;
      }

      .profile-header h2 {
        margin-left: 300px;
      }

      .profile-info {
        position: absolute;
        transform: translateX(25%);
        height: 500px;
        width: 65%;
        border-radius: 0px 0px 10px 10px;
        border: 2px solid black;
        background: rgba(255, 1, 255, 0.2);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
      }

      .info-mat {
        position: absolute;
        height: 440px;
        width: 95%;
        border-radius: 10px;
        border: 2px solid black;
        background: rgba(255, 255, 255, 0.4);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
        margin-top: 30px;
        margin-left: 30px;
      }

      .dice-thrower {
        position: relative;
        transform: translateX(25%);
        height: 400px;
        width: 66%;
        border-radius: 10px;
        border: 2px solid black;
        background: rgba(1, 255, 255, 0.2);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
        margin-top: 550px;
      }

      .dice-mat {
        position: relative;
        height: 335px;
        width: 95%;
        border-radius: 10px;
        border: 2px solid black;
        background: rgba(255, 255, 255, 0.4);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
        margin-top: 30px;
        margin-left: 30px;
      }

      h1,
      h2,
      h3,
      h4,
      hr {
        color: black;
        margin: 8px;
      }

      .edit-profile-btn {
        width: 100px;
        height: 30px;
        background: #e9e9;
        border-radius: 5px;
      }

      .centered {
        text-align: center;
        justify-content: center;
        align-items: center;
      }

      .d4 {
        position: absolute;
        top: 50px;
        left: 100px;
      }

      .d4-resp {
        position: absolute;
        top: 75px;
        left: 250px;
      }

      .d4-btn {
        width: 100px;
        position: absolute;
        top: 80px;
        left: 350px;
      }

      .d6 {
        position: absolute;
        top: 50px;
        right: 200px;
      }

      .d6-resp {
        position: absolute;
        top: 75px;
        right: 75px;
      }

      .d6-btn {
        width: 100px;
        position: absolute;
        top: 80px;
        right: 350px;
      }

      .d12 {
        position: absolute;
        bottom: 50px;
        left: 100px;
      }

      .d12-resp {
        position: absolute;
        bottom: 75px;
        left: 250px;
      }

      .d12-btn {
        width: 100px;
        position: absolute;
        bottom: 80px;
        left: 350px;
      }

      .d20 {
        position: absolute;
        bottom: 50px;
        right: 200px;
      }

      .d20-resp {
        position: absolute;
        bottom: 75px;
        right: 75px;
      }

      .d20-btn {
        width: 100px;
        position: absolute;
        bottom: 80px;
        right: 350px;
      }

      .dice {
        width: 100px;
        height: 100px;
        transition: 1.5s;
      }

      .dAll {
        width: 130px;
        position: absolute;
        bottom: 150px;
        right: 500px;
      }
    `,
  ],
})
export class UserProfileComponent implements OnInit {
  @Input()user!: UserDto;
  isEditing: boolean = false;
  editText: string = 'Editar';

  @ViewChild('d4') d4!: ElementRef;
  @ViewChild('d6') d6!: ElementRef;
  @ViewChild('d12') d12!: ElementRef;
  @ViewChild('d20') d20!: ElementRef;

  d4Rotation: number = 720;
  d6Rotation: number = 720;
  d12Rotation: number = 720;
  d20Rotation: number = 720;

  d4Result: number = 0;
  d6Result: number = 0;
  d12Result: number = 0;
  d20Result: number = 0;

  settingsForm: FormGroup = this.formBuilder.group({
    name: ['', []],
    surname: ['', []],
    username: ['', [Validators.required]],
    email: ['', [Validators.required]],
    age: ['', []],
    city: ['', []],
    bio: ['', []],
    pwd: ['', [Validators.required]],
    matchPwd: ['', [Validators.required]],
    userImg: ['', []],
  });

  constructor(
    private actRoute: ActivatedRoute,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private renderer: Renderer2,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    
  }

  edit() {
    if (this.editText === 'Editar') {
      this.editText = 'Dejar de Editar';
    } else {
      this.editText = 'Editar';
    }
    console.log(this.isEditing);
    this.isEditing = !this.isEditing;
    this.settingsForm.reset({
      name: this.user.name,
      surname: this.user.surname,
      email: this.user.email,
      username: this.user.username,
      age: this.user.age,
      city: this.user.city,
      userImg: this.user.userImg,
      bio: this.user.bio,
    });
  }

  saveChanges() {
    let user: UserDto = {
      username: this.settingsForm.get('username')?.value,
      name: this.settingsForm.get('name')?.value,
      surname: this.settingsForm.get('surname')?.value,
      age: Number(this.settingsForm.get('age')?.value),
      city: this.settingsForm.get('city')?.value,
      userImg: this.settingsForm.get('userImg')?.value,
      email: this.settingsForm.get('email')?.value,
      bio: this.settingsForm.get('bio')?.value,
      password: this.user.password,
      id: this.user.id,
    };
    this.authService.updateUserPostgres(user)
      .subscribe(user => {
        this.showSnackBar(`${user.username} ha sido actualizado correctamente`);
        setTimeout( () => {
          window.location.reload();
        }, 2000);
      });

  }

  deleteUser() {
    this.authService.deleteUserPostgres(this.user.id!)
      .subscribe( res => {
        this.showSnackBar('Usuario borrado correctamente');
      });
    setTimeout( () => {
      this.router.navigate(['../..']);
    }, 3000);
  }

  getRandomInt(min: number, max: number) {
    return Math.random() * (max - min) + min;
  } 

  throwD4() {
    const d4 = document.getElementById('d4');
    this.renderer.setStyle(d4, 'transform', `rotate(${this.d4Rotation}deg)`)
    this.d4Rotation += 720
    setTimeout(() => {
      this.d4Result = Math.floor(this.getRandomInt(1, 5));
    }, 1500);
  }

  throwD6() {
    const d6 = document.getElementById('d6');
    this.renderer.setStyle(d6, 'transform', `rotate(${this.d6Rotation}deg)`);
    this.d6Rotation += 720;
    setTimeout(() => {
      this.d6Result = Math.floor(this.getRandomInt(1, 7));
    }, 2000);
  }

  throwD12() {
    const d12 = document.getElementById('d12');
    this.renderer.setStyle(d12, 'transform', `rotate(${this.d12Rotation}deg)`);
    this.d12Rotation += 720;
    setTimeout(() => {
      this.d12Result = Math.floor(this.getRandomInt(1, 13));
    }, 2000);
  }

  throwD20() {
    const d20 = document.getElementById('d20');
    this.renderer.setStyle(d20, 'transform', `rotate(${this.d20Rotation}deg)`);
    this.d20Rotation += 720;
    setTimeout(() => {
      this.d20Result = Math.floor(this.getRandomInt(1, 21));
    }, 2000);
  }

  throwAll() {
    const d4 = document.getElementById('d4');
    const d6 = document.getElementById('d6');
    const d12 = document.getElementById('d12');
    const d20 = document.getElementById('d20');
    this.renderer.setStyle(d4, 'transform', `rotate(${this.d4Rotation}deg)`);
    this.renderer.setStyle(d6, 'transform', `rotate(${this.d6Rotation}deg)`);
    this.renderer.setStyle(d12, 'transform', `rotate(${this.d12Rotation}deg)`);
    this.renderer.setStyle(d20, 'transform', `rotate(${this.d20Rotation}deg)`);
    this.d4Rotation += 720;
    this.d6Rotation += 720;
    this.d12Rotation += 720;
    this.d20Rotation += 720;
    setTimeout(() => {
      this.d4Result = Math.floor(this.getRandomInt(1, 5));
    }, 2000)
    setTimeout(() => {
      this.d6Result = Math.floor(this.getRandomInt(1, 7));
    }, 2000);
    setTimeout(() => {
      this.d12Result = Math.floor(this.getRandomInt(1, 13));
    }, 2000);
    setTimeout(() => {
      this.d20Result = Math.floor(this.getRandomInt(1, 21));
    }, 2000);
  }

  showSnackBar(msg: string) {
    this.snackBar.open(msg, 'Ok!', {
      duration: 3000,
    });
  }
}
