import { Component, input, OnInit, inject, signal } from "@angular/core";
import { TextBoxComponent } from "@shared/ui/text-box/text-box.component";
import { FaqAccordionContent } from "./faq-accordion.interface";
import { AccordionStateService } from "@core/services/accordion-state/accordion-state.service";

@Component({
    selector: 'app-faq-accordion',
    standalone: true,
    imports: [TextBoxComponent],
    templateUrl: './faq-accordion.component.html',
    styleUrl: './faq-accordion.component.scss',
}) export class FaqAccordionComponent implements OnInit {
    public readonly CONTENT = input.required<FaqAccordionContent>();
    private readonly ACCORDION = inject(AccordionStateService);
    
    public ngOnInit(): void {
        this.ACCORDION.resetAll();
        this.CONTENT().items.forEach(item => this.ACCORDION.getSignal(item.code));
    }

    public toggle(code: string): void {
        this.ACCORDION.toggleById(code);
    }

    public isOpen(code: string): boolean {
        return this.ACCORDION.getSignal(code)();
    }
}