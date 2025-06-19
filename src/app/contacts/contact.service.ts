import { Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contacts: Contact[] = [];
  contactListChangedEvent = new Subject<Contact[]>();
  maxContactId: number;

  constructor(private http: HttpClient) {
    this.getContacts();
  }

  getContacts() {
    this.http.get<Contact[]>('https://cmsp-224f8-default-rtdb.firebaseio.com/contacts.json')
      .subscribe({
        next: (contacts) => {
          this.contacts = contacts || [];
          this.maxContactId = this.getMaxId();
          this.contacts.sort((a, b) => a.name.localeCompare(b.name));
          this.contactListChangedEvent.next(this.contacts.slice());
        },
        error: (error) => {
          console.error('Error fetching contacts:', error);
        }
      });
  }

  storeContacts() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.put('https://cmsp-224f8-default-rtdb.firebaseio.com/contacts.json', this.contacts, { headers })
      .subscribe(() => {
        this.contactListChangedEvent.next(this.contacts.slice());
      });
  }

  addContact(newContact: Contact) {
    if (!newContact) return;
    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
    this.storeContacts();
  }

  updateContact(original: Contact, newContact: Contact) {
    if (!original || !newContact) return;
    const index = this.contacts.findIndex(c => c.id === original.id);
    if (index < 0) return;
    newContact.id = original.id;
    this.contacts[index] = newContact;
    this.storeContacts();
  }

  deleteContact(contact: Contact) {
    if (!contact) return;
    const index = this.contacts.findIndex(c => c.id === contact.id);
    if (index < 0) return;
    this.contacts.splice(index, 1);
    this.storeContacts();
  }

  getContact(id: string): Contact {
    return this.contacts.find(contact => contact.id === id);
  }

  getMaxId(): number {
    let maxId = 0;
    this.contacts.forEach(contact => {
      const id = +contact.id;
      if (id > maxId) maxId = id;
    });
    return maxId;
  }
}
