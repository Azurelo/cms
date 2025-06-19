import { Component, OnDestroy, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
})
export class ContactListComponent implements OnInit, OnDestroy {
  contacts: Contact[] = [];
  term: string = '';
  private sub: Subscription;

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.sub = this.contactService.contactListChangedEvent.subscribe(
      contacts => this.contacts = contacts
    );
    this.contactService.getContacts(); 
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  search(value: string): void {
    this.term = value;
  }
}
