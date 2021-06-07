import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { MaterialModule } from '../material/material.module';
import { CharactersModule } from '../characters/characters.module';
import { BannerComponent } from './components/banner/banner.component';


@NgModule({
  declarations: [
    LandingPageComponent,
    BannerComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MaterialModule,
    CharactersModule
  ],
  exports: [
    BannerComponent
  ]
})
export class SharedModule { }
