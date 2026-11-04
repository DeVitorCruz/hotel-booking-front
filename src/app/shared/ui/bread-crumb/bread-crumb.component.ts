import { AfterViewInit, Component, computed, inject, input, OnDestroy, OnInit, signal } from '@angular/core';
import { BreadCrumbItem } from './bread-crumb-item.interface';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AnchorFlex } from '../anchor-flex/anchor-flex.component';


@Component({
  selector: 'app-bread-crumb',
  imports: [
    CommonModule,
    AnchorFlex
  ],
  templateUrl: './bread-crumb.component.html',
})
export class BreadCrumbComponent implements OnInit, OnDestroy {
  private readonly ROUTER = inject(Router);
  private readonly ROUTE = inject(ActivatedRoute);
  public readonly BREAD_CRUMB = signal<BreadCrumbItem[]>([]);
  public readonly BREAD_CRUMB_ITEM = computed(() => { return this.BREAD_CRUMB(); });
  public sub!: Subscription;

  public readonly COSTUME_CLASS_NAME_LIST = input<string[]>([]);
  public readonly CLASS_LIST = computed(() => { return this.COSTUME_CLASS_NAME_LIST(); });

  public ngOnInit(): void {
    
    this._buildBreadcrumb();

    this.sub = this.ROUTER.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe(() => {
        this._buildBreadcrumb();
      }
    );
  }

  private _buildBreadcrumb(): void {
    const CRUMBS: BreadCrumbItem[] = [];
    CRUMBS.push({ label: 'home', url: '/', });

    let currentRoute: ActivatedRoute = this.ROUTE.root;
    let url: string = '';

    while (currentRoute.firstChild) {
      currentRoute = currentRoute.firstChild;

      if (currentRoute.snapshot.url.length > 0) {
        const PATH_SEGMENT = currentRoute.snapshot.url.map(u => u.path).join('/');
        url += `/${PATH_SEGMENT}`;

        let label = currentRoute.snapshot.data['breadcrumb'];

        if (!label) {
          label = PATH_SEGMENT;
        }

        if (currentRoute.snapshot.paramMap.keys.length > 0) {
          currentRoute.snapshot.paramMap.keys.forEach((key) => {
            const PARAM_VALUE = currentRoute.snapshot.paramMap.get(key);

            if (PARAM_VALUE) {
              label = currentRoute.snapshot.data['paramLabel'] ?? PARAM_VALUE;
            } 
          });
        }
        CRUMBS.push({ label, url });
      }
    }

    this.BREAD_CRUMB.set(CRUMBS);
  }

  public ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
