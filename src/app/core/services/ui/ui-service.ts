import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  public mergedList(defaultList: string[], inputedList: string[]): string[] {
    return [...new Set([...defaultList, ...inputedList])];
  }
}
