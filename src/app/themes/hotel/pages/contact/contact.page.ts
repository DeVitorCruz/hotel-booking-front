import { Component, inject, signal, Signal, viewChild, WritableSignal } from '@angular/core';
import { ContactComponent } from '@ui-building/contact/contact.component';
import { CONTACT_CONTENT } from './contact-content/CONTACT_ CONTENT';
import { ContactContent } from '@ui-building/contact/contact.interface';
import { ContactRequest } from '@core/models/contact/contact.model';
import { ContactService } from '@core/services/contact/contact.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-contact',
  imports: [ContactComponent],
  templateUrl: './contact.page.html',
  styleUrl: './contact.page.scss'
})
export class ContactPage {
  private readonly CONTACT_SERVICE: ContactService = inject(ContactService);
  private readonly ROUTER: Router = inject(Router); 
  private readonly SANITIZER: DomSanitizer = inject(DomSanitizer);

  public readonly CONTACT_REF: Signal<ContactComponent | undefined> = viewChild(ContactComponent);

  public readonly CREDENTIALS: ContactRequest = {
    name: '' as string,
    email: '' as string,
    message: '' as string,
  } as ContactRequest;

  public readonly CONTACT_CONTENT: ContactContent = {
    ...CONTACT_CONTENT,
    map: {
      iframeSrc: this.SANITIZER.bypassSecurityTrustResourceUrl('https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3675.3564!2d-43.1729!3d-22.9068!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDU0JzI0LjUiUyA0M8KwMTAnMjIuNCJX!5e0!3m2!1sen!2sbr!4v1234567890') as unknown as string,
      height: '450px' as string,
    },
    formContent: {
      ...CONTACT_CONTENT.formContent,
      fields: CONTACT_CONTENT.formContent.fields.map(m => {
        if (m.id === 0) {
          m.onValueChange = (v: string) => this.CREDENTIALS.name = v;
        } else if (m.id === 1) {
          m.onValueChange = (v: string) => this.CREDENTIALS.email = v;
        } else if (m.id === 2) {
          m.onValueChange = (v: string) => this.CREDENTIALS.message = v;
        }

        return m;
      }),
    },
  } as ContactContent;

  public onContactSubmit(): void {
    this.CONTACT_SERVICE.submit(this.CREDENTIALS).subscribe({
      next: () => this.CONTACT_REF()?.showSuccess(),
      error: () => this.ROUTER.navigate(['/error-404']),
    });
  }
}
