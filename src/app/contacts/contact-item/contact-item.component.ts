import { Component, Input } from '@angular/core';
import { Contact } from '../contact.model';

@Component({
  selector: 'cms-contact-item',
  templateUrl: './contact-item.component.html'
})
export class ContactItemComponent {
  @Input() contact: Contact;
}
