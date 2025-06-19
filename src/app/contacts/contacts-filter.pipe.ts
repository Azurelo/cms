import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from './contact.model';

@Pipe({
  name: 'contactsFilter'
})
export class ContactsFilterPipe implements PipeTransform {
  transform(contacts: Contact[], term: string): Contact[] {
    if (!term || term.trim() === '') {
      return contacts;
    }
    term = term.toLowerCase();
    const filtered = contacts.filter(c =>
      c.name.toLowerCase().includes(term)
    );
    return filtered.length > 0 ? filtered : contacts;
  }
}
