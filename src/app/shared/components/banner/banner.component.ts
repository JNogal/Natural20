import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styles: [
    `
      .img-container {
        position: relative;
        height: 300px;
        background: url('../../../assets/nat202dark.jpg') center no-repeat;
        background-size: cover;
        padding-top: 20px;
      }

      .inner-container {
        position: absolute;
        text-align: center;
        width: 100%;
        height: 200px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(255,255,255,.2);
        box-shadow: 0 5px 15px rgba(0,0,0,.5);
      }

      .bannerh1 {
        top: 50%;
        left: 50%;
        transform: translate(0%, 250%);
        font-size: 7em;
      }

      .bannerh2 {
        top: 50%;
        left: 50%;
        transform: translate(0%, 300%);
      }
    `
  ]
})
export class BannerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
