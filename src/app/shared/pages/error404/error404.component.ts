import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error404',
  templateUrl: './error404.component.html',
  styles: [
    `
      * {
        background: #4c4848
      }
    `
  ]
})
export class Error404Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
