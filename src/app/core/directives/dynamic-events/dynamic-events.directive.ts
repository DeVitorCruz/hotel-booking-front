import { computed, DestroyRef, Directive, effect, ElementRef, inject, input, Renderer2, signal, WritableSignal } from '@angular/core';
import { DynamicEventConfig } from './dynamic-event.config';
import { MatSideLeftBarService } from '../../services/side-bar/mat-side-left-bar.service';
import { MatSideRightBarService } from '../../services/side-bar/mat-side-right-bar.service';
import { AccordionStateService } from '../../services/accordion-state/accordion-state.service';


@Directive({
  selector: '[appDynamicEvents]'
})
export class DynamicEventsDirective {
  private readonly EL = inject(ElementRef);
  private readonly RENDERER = inject(Renderer2);
  private readonly DESTROY_REF = inject(DestroyRef);

  private readonly MAT_SIDE_LEFT_BAR_SERVICE = inject(MatSideLeftBarService);
  private readonly MAT_SIDE_RIGHT_BAR_SERVICE = inject(MatSideRightBarService);

  public readonly CONFIG_LIST = input<DynamicEventConfig[]>();
  public readonly CONFIG = computed(() => { return this.CONFIG_LIST(); });

  private unListenFuncs: (() => void)[] = [];
  private actionMap: Record<string, (e: Event) => void> = {};

  private readonly ACCORDION_STATE = inject(AccordionStateService);

  private readonly TRANSIENT_TEXT: WritableSignal<string> = signal<string>('');
  private readonly TRANSIENT_TEXT_EFFECT = computed(() => { return this.TRANSIENT_TEXT(); }); 

  constructor() {
    effect(() => {
      this.manageEventListener();

      this.CONFIG()?.forEach((configItem) => {
        if (configItem.accordionItem) {
          const TRANSIENT = configItem.accordionItem.subItem_code;
          this.TRANSIENT_TEXT.update(() => { return TRANSIENT; });
        }
      });
    });
  }

  private setListenersMethods(listeners: Record<string, (e: Event) => void>): void {
    Object.entries(listeners).forEach(([eventName, method]) => {
      const UN_LISTEN = this.RENDERER.listen(this.EL.nativeElement, eventName, method);
      this.DESTROY_REF.onDestroy(() => { UN_LISTEN(); });
    });
  }

  private setActiveMap(eventName: string, eventMethod: (e: Event) => void, actionType: string = ''): void {  
    this.actionMap[eventName] = this.switchMethod(actionType, eventMethod);
  }

  private clearListeners(): void {
    this.unListenFuncs.forEach((unListe) => { unListe(); });
    this.unListenFuncs = [];
  }

  private manageEventListener(): void {
    if (this.CONFIG()) {
      this.clearListeners();

      this.CONFIG()?.forEach((item) => {
        this.setActiveMap(item.nameEvent, item.eventMethod, item.actionType);
      });

      this.setListenersMethods(this.actionMap);
    }
  }

  private switchMethod(actionType: string = '', eventMethod: (e: Event) => void): (e :Event) => void {
    let effectiveMethod:(e: Event) => void = (e) => {};

    switch(actionType){
      case 'toggleLeftSidebar':
        effectiveMethod = (e) => { this.toggleLeftSideBar(); };
        break;

      case 'toggleRightSideBar': 
        effectiveMethod = (e) => { this.toggleRightSideBar(); };
        break;

      case 'closeButtonLeft':
        effectiveMethod = (e) => { this.closeButtonLeft(); };
        break;

      case 'closeButtonRight':
        effectiveMethod = (e) => { this.closeButtonRight(); };
        break;

      case 'openButtonLeft':
        effectiveMethod = (e) => { this.openButtonLeft(); };
        break;

      case 'openButtonRight':
        effectiveMethod = (e) => { this.openButtonRight(); };
        break;

      case 'accordionToggle':
        effectiveMethod = (e) => { this.accordionToggle(); };
        break;

      default:
        effectiveMethod = eventMethod; 
    }
      
    return effectiveMethod;
  }

  private toggleLeftSideBar(): void {
    this.MAT_SIDE_LEFT_BAR_SERVICE.toggleLeftSidebar();
  }

  private toggleRightSideBar(): void {
    this.MAT_SIDE_RIGHT_BAR_SERVICE.toggleRightSidebar();
  }

  private closeButtonLeft(): void {
    this.MAT_SIDE_LEFT_BAR_SERVICE.closeLeftSidebar();
  }

  private closeButtonRight(): void {
    this.MAT_SIDE_RIGHT_BAR_SERVICE.closeRightSidebar(); 
  }

  private openButtonLeft(): void {
    this.MAT_SIDE_LEFT_BAR_SERVICE.openLeftSidebar();
  }

  private openButtonRight(): void {
    this.MAT_SIDE_RIGHT_BAR_SERVICE.openRightSidebar(); 
  }

  private accordionToggle(): void {
    this.ACCORDION_STATE.toggleById(this.TRANSIENT_TEXT_EFFECT());
  }
}
