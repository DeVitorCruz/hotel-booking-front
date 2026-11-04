import { Component, computed, effect, inject, Renderer2, Signal } from "@angular/core";
import { Router, RouterOutlet, NavigationEnd } from "@angular/router";
import { ContainerComponent } from "@shared/ui/container/container.component";
import { LEFT_CONTENT } from "./left-content/LEFT_CONTENT";
import { ContainerBlock } from "@shared/ui/container/container-block.interface";
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, startWith } from "rxjs";

@Component({
    selector: 'app-auth-shell',
    standalone: true,
    imports: [
        ContainerComponent,
        RouterOutlet
    ],
    templateUrl: './auth-shell.page.html',
    styleUrl: './auth-shell.page.scss',
}) export class AuthShellPage {
    public readonly _LEFT_CONTENT: ContainerBlock = LEFT_CONTENT;
    public anchorFlexItem!: any;

    private readonly ROUTER = inject(Router);
    private readonly URL = toSignal(
        this.ROUTER.events.pipe(
            filter(e => e instanceof NavigationEnd ),
            map(() => this.ROUTER.url),
            startWith(this.ROUTER.url)
        )
    );

    public readonly IS_LOGIN: Signal<boolean | undefined> = computed(() => !this.URL()?.includes('register'));
    public readonly TOGGLE_LABE: Signal<string> = computed(() => this.IS_LOGIN() ? 'Create Account' : 'Log In');
    public readonly TOGGLE_ROUTE: Signal<string> = computed(() => this.IS_LOGIN() ? '/auth/register' : '/auth/login');
    public readonly TOGGEL_ARIA_LABEL: Signal<string> = computed(() => this.IS_LOGIN() ? 'Register' : 'Log In');
    
    constructor(private renderer: Renderer2) {
        effect(() => {
            this.anchorFlexItem = this._LEFT_CONTENT.items[0].componentInput['BLOCK_SEQUENCE_SPACE'].items[1].componentInput['ANCHOR_FLEX_ITEM'];
            if(!this.anchorFlexItem) return;

            this.anchorFlexItem.title = this.TOGGLE_LABE();
            this.anchorFlexItem.rlink = this.TOGGLE_ROUTE();
            this.anchorFlexItem.ariaLabel = this.TOGGEL_ARIA_LABEL();
        });
    }
}