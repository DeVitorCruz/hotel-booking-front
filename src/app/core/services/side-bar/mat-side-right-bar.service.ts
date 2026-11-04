import { Injectable, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Injectable({
  providedIn: 'root'
})
export class MatSideRightBarService {
  @ViewChild('rightDrawer') public rightSidebar!: MatSidenav;

  public setRightSidebar(rightSidenav: MatSidenav): void {
    this.rightSidebar = rightSidenav;
  }

  public openRightSidebar(): void {
    this.rightSidebar.open();
  }

  public closeRightSidebar(): void {
    this.rightSidebar.close();
  }

  public toggleRightSidebar(): void {
    this.rightSidebar.toggle();
  }
}
