import { Component, computed, inject, OnInit, signal, viewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FaqAccordionComponent } from '@ui-building/faq-accordion/faq-accordion.component';
import { FaqAccordionContent, FaqAccordionItem } from '@ui-building/faq-accordion/faq-accordion.interface';
import { FaqService } from '@core/services/faq/faq.service';
import { FAQ_LIST_CONTENT } from './faq-list-content/FAQ_LIST_CONTENT';
import { TextBox } from '@shared/ui/text-box/text-box-item.interface';
import { HEADER } from './faq-list-content/HEADER';
import { FaqContactComponent } from '@ui-building/faq-contact/faq-contact';
import { FAQ_CONTACT } from './faq-contact/FAQ_CONTACT';
import { FaqContactContent } from '@ui-building/faq-contact/faq-contact.interface';
import { ContactService } from '@core/services/contact/contact.service';
import { ContactRequest } from '@core/models/contact/contact.model';

@Component({
  selector: 'app-faq',
  imports: [
    FaqAccordionComponent,
    FaqContactComponent,
  ],
  templateUrl: './faq.page.html',
  styleUrl: './faq.page.scss'
})
export class FaqPage implements OnInit {
  private readonly FAQ_SERVICE = inject(FaqService);
  private readonly ROUTER = inject(Router);
  private readonly CONTACT_SERVICE = inject(ContactService);

  public readonly CONTACT_REF = viewChild(FaqContactComponent);

  public readonly LOADING = signal<boolean>(false);
  public readonly FAQ_CONTENT = signal<FaqAccordionContent | null>(null);
  public readonly FAQ = computed(() => this.FAQ_CONTENT());
  public readonly LOADING_EFFECT = computed(() => this.LOADING());

  public readonly CONTACT_CONTENT: FaqContactContent = FAQ_CONTACT;

  public readonly CREDENTIALS: ContactRequest = {
    name: '' as string,
    email: '' as string,
    message: '' as string,
  };

  constructor() {
    this.CONTACT_CONTENT.formContent.fields[0].onValueChange = (value: string) => this.CREDENTIALS.name = value;
    this.CONTACT_CONTENT.formContent.fields[1].onValueChange = (value: string) => this.CREDENTIALS.email = value;
    this.CONTACT_CONTENT.formContent.fields[2].onValueChange = (value: string) => this.CREDENTIALS.message = value;
  }
  
  public ngOnInit(): void {
    this.FAQ_CONTENT.set(FAQ_LIST_CONTENT);
    // this.setFaqContentOrFail();
  }

  public onContactSubmit(): void {
    this.CONTACT_SERVICE.submit(this.CREDENTIALS).subscribe({
      next: () => this.CONTACT_REF()?.showSuccess(),
      error: () => this.ROUTER.navigate(['/error-404']),
    });
  }

  private setFaqContentOrFail(): void {
    this.LOADING.set(true);
    
    this.FAQ_SERVICE.getAll().subscribe({
      next: (response) => {
        this.FAQ_CONTENT.set({
          header: HEADER as TextBox[],
          items: response.data.map(item => ({
            id: item.id,
            question: item.question,
            answer: item.answer,
            code: `faq-${item.id}`,
          })) as FaqAccordionItem[],
        });

        this.LOADING.set(false);
      },
      error: () => this.ROUTER.navigate(['/error-404']),
    });
  }
}
