import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from 'src/app/auth/components/login-dialog/login-dialog.component';
import { CharacterDto } from 'src/app/characters/interfaces/characters.interfaces';
import { CharactersService } from '../../../characters/services/characters.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styles: [
    `
      .bg {
        background-image: url('https://i.pinimg.com/originals/a9/b8/19/a9b8197fa60aedee443d45a17fddc11a.jpg');
        background-repeat: no-repeat;
        background-size: 200%;
      }

      button {
        margin: 5px;
      }

      .titleContainer {
        text-align: center;
        justify-content: center;
        align-items: center;
      }

      .introduction {
        font-size: 20px;
      }

      .inner-container {
        margin-top: 30px;
        margin-left: 25%;
        text-align: center;
        width: 50%;
        font-size: 20px;
        background: rgba(255, 255, 255, 0.2);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
        border-radius: 10px;
        border: 2px solid black;
        margin-bottom: 20px;
      }

      .transp-container {
        margin-left: 37.5%;
        width: 25%;
        font-size: 20px;
        background: rgba(255, 255, 255, 0.2);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
        border-radius: 10px;
        padding-top: 15px;
        padding-bottom: 5px;
        border: 2px solid black;
        margin-bottom: 20px;
      }

      .purpbg {
        background: #4c4848;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
        border-radius: 10px;
        border: 2px solid black;
        width: 60%;
        margin-left: 20%;
      }

      .greenbg {
        background: #4c4848;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
        border-radius: 10px;
        border: 2px solid black;
        width: 60%;
        margin-left: 20%;
        margin-bottom: 20px;
      }

      .introbg {
        background: #4c4848;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
        border-radius: 10px;
        border: 2px solid black;
        width: 60%;
        padding-bottom: 10px;
        margin-left: 20%;
        margin-top: 20px;
      }

      .centered {
        padding-left: 30px;
        padding-right: 30px;
        padding-top: 30px;
      }

      .center {
        justify-content: center;
        align-items: center;
      }

      .signupbutton {
        margin-bottom: 20px;
        margin-top: 20px;
        width: 100px;
      }

      .supertext {
        margin-top: 20px;
        font-size: 50px;
        font-weight: bold;
      }

      * {
        box-sizing: border-box;
      }

      .slideshow-container {
        max-width: 1500px;
        position: relative;
        margin: auto;
        border: 2px solid black;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
      }

      .mySlides {
        display: none;
      }

      .prev,
      .next {
        cursor: pointer;
        position: absolute;
        top: 50%;
        width: auto;
        margin-top: -22px;
        padding: 16px;
        color: white;
        font-weight: bold;
        font-size: 18px;
        transition: 0.6s ease;
        border-radius: 0 3px 3px 0;
        user-select: none;
      }

      .next {
        right: 0;
        border-radius: 3px 0 0 3px;
      }

      .prev {
        left: 0;
        border-radius: 3px 0 0 3px;
      }

      .prev:hover,
      .next:hover {
        background-color: rgba(0, 0, 0, 0.8);
      }

      .text {
        color: #f2f2f2;
        font-size: 15px;
        padding: 8px 12px;
        position: absolute;
        bottom: 8px;
        width: 100%;
        text-align: center;
      }

      .numbertext {
        color: #f2f2f2;
        font-size: 12px;
        padding: 8px 12px;
        position: absolute;
        top: 0;
      }

      .dot {
        cursor: pointer;
        height: 15px;
        width: 15px;
        margin: 0 2px;
        background-color: #bbb;
        border-radius: 50%;
        display: inline-block;
        transition: background-color 0.6s ease;
      }

      .active,
      .dot:hover {
        background-color: #717171;
      }

      .fade {
        -webkit-animation-name: fade;
        -webkit-animation-duration: 1.5s;
        animation-name: fade;
        animation-duration: 1.5s;
      }

      @-webkit-keyframes fade {
        from {
          opacity: 0.4;
        }
        to {
          opacity: 1;
        }
      }

      @keyframes fade {
        from {
          opacity: 0.4;
        }
        to {
          opacity: 1;
        }
      }
    `,
  ],
})
export class LandingPageComponent implements OnInit, AfterViewInit {
  characters: CharacterDto[] = [];
  slideIndex = 1;

  constructor(
    private charService: CharactersService,
    private dialog: MatDialog
  ) {}

  ngAfterViewInit(): void {
    this.showSlides(1);
  }

  ngOnInit(): void {
    this.charService.getCharactersPostgres(3).subscribe((characters) => {
      this.characters = characters;
      console.log(characters);
    });
  }

  openLoginPopup() {
    this.dialog.open(LoginDialogComponent, {
      width: '350px',
    });
  }

  deleteChar() {
    this.characters = [];
  }

  loadChar() {
    this.charService.getCharacterByIdPostgres(14).subscribe((character) => {
      this.characters.push(character);
      console.log(character);
    });
  }

  plusSlides(n: number) {
    this.showSlides((this.slideIndex += n));
  }

  currentSlide(n: number) {
    this.showSlides((this.slideIndex = n));
  }

  showSlides(n: number) {
    let i;
    const slides: any = document.getElementsByClassName('mySlides');
    const dots: any = document.getElementsByClassName('dot');
    if (n > slides.length) {
      this.slideIndex = 1;
    }
    if (n < 1) {
      this.slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = 'none';
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(' active', '');
    }
    slides[this.slideIndex - 1].style.display = 'block';
    dots[this.slideIndex - 1].className += ' active';
  }
}
