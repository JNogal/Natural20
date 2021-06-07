import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UserDto } from '../../../auth/interfaces/user.interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
    `
      .bg {
        background-image: url('https://i.pinimg.com/originals/a9/b8/19/a9b8197fa60aedee443d45a17fddc11a.jpg');
        background-repeat: no-repeat;
        background-size: 200%;
      }

      .container {
        margin: 10px;
      }
    `
  ]
})
export class HomeComponent implements OnInit {

  isHome: boolean = false;

  get auth() {
    return {...this.authService.connectedUser}.name
  }

  id!: number;
  user!: UserDto;
  hasCharacters!: boolean;
  
  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.isHomeOnly();
    this.activatedRoute.params
      .subscribe( ({id}) => this.id = id );
    this.authService.getUserById(this.id)
      .subscribe( user => this.user = user); 
    const route: string = this.router.url;
    if(route?.includes('characters')) {
      this.hasCharacters = true;
    } else {
      this.hasCharacters = false;
    }
  }

  logout() {
    this.router.navigate(['']);
    this.authService.logout();
  }

  onActivate(event: any) {
    let scrollToTop = window.setInterval(() => {
      let pos = window.pageYOffset;
      if (pos > 0) {
        window.scrollTo(0, pos - 20); // how far to scroll on each step
      } else {
        window.clearInterval(scrollToTop);
      }
    }, 16);
  }

  async isHomeOnly() {
    // let resp: boolean = true;
    // await this.activatedRoute.url.toPromise().then(res => {
    //   res.forEach( (item) => {
    //     console.log(item);
    //     if(item.toString() === 'characters') {
    //       resp = false;
    //     }
    //   })
    // });
    // console.log(resp);
    // return resp;
    this.activatedRoute.url
      .subscribe( item => {
        console.log(item);
        item.forEach( item => {
          if(item.path === 'characters') {
            this.isHome = false;
          } else {
            this.isHome = true;
          }
        })
      })
  }
}
