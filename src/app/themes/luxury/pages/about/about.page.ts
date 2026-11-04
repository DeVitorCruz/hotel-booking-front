import { Component } from '@angular/core';
import { TestimonialComponent } from '@ui-building/testimonial/testimonial.component';
import { AboutConfig } from './about-config.interface';
import { ABOUT_CONFIG } from './ABOUT_CONFIG';
import { CardGridComponent } from '@ui-building/card-grid/card-grid.component';
import { ContainerComponent } from '@shared/ui/container/container.component';

@Component({
  selector: 'app-about',
  imports: [TestimonialComponent, CardGridComponent, ContainerComponent],
  templateUrl: './about.page.html'
})
export class AboutPage {
  public readonly CONFIG: AboutConfig = ABOUT_CONFIG;
}
