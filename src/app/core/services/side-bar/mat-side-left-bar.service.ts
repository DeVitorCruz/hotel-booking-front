import { Injectable, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';


@Injectable({
  providedIn: 'root'
})
export class MatSideLeftBarService {
  @ViewChild('leftDrawer') public leftSidebar!: MatSidenav;

  public setLeftSideBar(leftSidebar: MatSidenav): void {
    this.leftSidebar = leftSidebar;
  }

  public openLeftSidebar(): void {
    this.leftSidebar.open();
  }

  public closeLeftSidebar(): void {
    this.leftSidebar.close();
  }

  public toggleLeftSidebar(): void {
    this.leftSidebar.toggle();
  }

  public execute(): void {
    // this.toggleLeftSidebar();
  }
}
