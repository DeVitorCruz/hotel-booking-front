import { Component, computed, input, OnInit } from '@angular/core';
import { SmartImageDirective } from '../../../core/directives/memory-manage/image/smart-image.directive';
import { MediaImg } from '../../../core/models/media/media-img.interface';
import { ImgFlexAddiction } from './img-flex-addiction.interface';
import { IconFlexComponent } from '../icon-flex/icon-flex.component';


@Component({
  selector: 'app-img-flex',
  imports: [
    SmartImageDirective,
    IconFlexComponent
  ],
  templateUrl: './img-flex.component.html'
})
export class ImgFlex implements OnInit {
  public readonly IMAGE_FLEX_ITEM = input.required<MediaImg>();
  public readonly FLEX_IMAGE = computed(()=> { return this.IMAGE_FLEX_ITEM(); });
  
  public readonly IMAGE_FLEX_ADDICTION_LIST = input<ImgFlexAddiction[]>();
  public readonly FLEX_ADDICTION_LIST = computed(() => { return this.IMAGE_FLEX_ADDICTION_LIST(); });

  public image!: MediaImg;

  public ngOnInit(): void {
    this.setImage();
  }

  public setImage(): void {
    this.image = this.FLEX_IMAGE();
  }
}
