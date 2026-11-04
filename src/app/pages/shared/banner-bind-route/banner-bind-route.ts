import { Component, computed, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, RouterOutlet, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { TAILWIND_BREAD_CRUMB } from './tailwindCollect/TAILWIND_BREAD_CRUMB';
import { ContainerBlock } from '@shared/ui/container/container-block.interface';
import { ContainerComponent } from '@shared/ui/container/container.component';
import { TextBox } from '@shared/ui/text-box/text-box-item.interface';
import { SequenceSpaceItem } from '@shared/ui/sequence-space/sequence-space-item';
import { FlexHeadingItem } from '@shared/ui/flex-heading/flex-heading-item';


@Component({
  selector: 'app-banner-bind-router',
  imports: [
    RouterOutlet,
    ContainerComponent
  ],
  templateUrl: './banner-bind-route.html',
})
export class BannerBindRoute implements OnInit, OnDestroy {
  private readonly ROUTE = inject(ActivatedRoute);
  private readonly ROUTER = inject(Router);
  public readonly HEADER_BLOCK = signal<ContainerBlock | null>(null);
  public readonly HEADER = computed(() => this.HEADER_BLOCK());  
  private sub?: Subscription;

  public readonly TAILWIND_BREAD_CRUMB: string[] = TAILWIND_BREAD_CRUMB;

  public ngOnInit(): void {
    this._buildHeader();
    this._setSubResource();
  }

  private _setSubResource(): void {
    this.sub = this.ROUTER.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe(() => {
      this._buildHeader();
    });
  }

  private _buildHeader(): void {
    let route: ActivatedRoute = this.ROUTE;

    while (route.firstChild) {
      route = route.firstChild;
    }

    route.data.subscribe((data) => {
      const BLOCK = data['headerBlock'] as ContainerBlock;
      const BREADCRUMB = data['breadcrumb'] as string ?? '';

      if (BLOCK) {
        const DYNAMIC_BLOCK: ContainerBlock = {
          ...BLOCK,
          items: BLOCK.items.map(item => {
            if (item.id === 1) { // BANNER_MAIN_CONTAINER
              return {
                ...item,
                componentInput: {
                  BLOCK_SEQUENCE_SPACE: {
                    ...item.componentInput['BLOCK_SEQUENCE_SPACE'],
                    items: item.componentInput['BLOCK_SEQUENCE_SPACE'].items.map((textItem:  SequenceSpaceItem) => {
                      
                      if (textItem.id === 0) {
                        return {
                          ...textItem,
                          componentInput: {
                            TEXT_BOX_LIST: [
                              {
                                id: 0,
                                heading: { id: 0, headingType: 'h2', text: BREADCRUMB.toUpperCase(), } as FlexHeadingItem,
                              } as TextBox,
                            ] as TextBox[],
                          }
                        };
                      } 
                      
                      return textItem;
                    }),
                  } as ContainerBlock,
                },
              };
            }
            
            return item; 
          }),
        };
        
        this._updateBannerData(DYNAMIC_BLOCK);
      }
    });
  }

  private _updateBannerData(dataItem?: ContainerBlock): void {
    if (!dataItem) return; 

    this.HEADER_BLOCK.set(dataItem);
  }

  public ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
