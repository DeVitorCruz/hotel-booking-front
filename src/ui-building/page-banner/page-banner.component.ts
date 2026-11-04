import { Component, input, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PageBannerItem } from './page-banner.interface';

@Component({
  selector: 'app-page-banner',
  imports: [RouterLink],
  templateUrl: './page-banner.component.html',
  styleUrl: './page-banner.component.scss'
})
export class PageBannerComponent {
	public readonly TITLE = input.required<string>();
	public readonly BREADCRUMBS = input<PageBannerItem[]>([]);
	public readonly BG_IMAGE = input<string>('');
	
	public readonly _BREADCUMBS = computed(() => this.BREADCRUMBS());
	public readonly _TITLE = computed(() => this.TITLE());
	public readonly _BG_IMAGE = computed(() => this.BG_IMAGE());
}
