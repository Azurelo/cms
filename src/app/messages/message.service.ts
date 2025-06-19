import { Injectable } from '@angular/core';
import { Message } from './message.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: Message[] = [];
  messageChangedEvent = new Subject<Message[]>();
  maxMessageId: number;

  constructor(private http: HttpClient) {
    this.getMessages();
  }

  getMessages() {
    this.http.get<Message[]>('https://cmsp-224f8-default-rtdb.firebaseio.com/messages.json')
      .subscribe({
        next: (messages) => {
          this.messages = messages || [];
          this.maxMessageId = this.getMaxId();
          this.messageChangedEvent.next(this.messages.slice());
        },
        error: (error) => {
          console.error('Error fetching messages:', error);
        }
      });
  }

  storeMessages() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.put('https://cmsp-224f8-default-rtdb.firebaseio.com/messages.json', this.messages, { headers })
      .subscribe(() => {
        this.messageChangedEvent.next(this.messages.slice());
      });
  }

  addMessage(message: Message) {
    if (!message) return;
    this.maxMessageId++;
    message.id = this.maxMessageId.toString();
    this.messages.push(message);
    this.storeMessages();
  }

  getMessage(id: string): Message {
    return this.messages.find(message => message.id === id);
  }

  getMaxId(): number {
    let maxId = 0;
    this.messages.forEach(msg => {
      const id = +msg.id;
      if (id > maxId) maxId = id;
    });
    return maxId;
  }
}
