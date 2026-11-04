import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SinglePanel } from '../../../layouts/full-screen/single-panel/single-panel';
import { ThemeService } from '../../../core/services/theme.service';


@Component({
  selector: 'app-sp-home',
  imports: [
    CommonModule, 
    SinglePanel],
  templateUrl: './sp-home.page.html'
})
export class SpHome {
  public hero!: any;

  constructor(private theme: ThemeService){
    this.hero = this.theme.getContent('hero');
  }

  public getYear(): number {
    const YEAR = new Date().getFullYear();
  
    return YEAR
  }
}
