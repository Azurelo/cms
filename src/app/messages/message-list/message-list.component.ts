import { Component } from '@angular/core';
import { Message } from '../message.model'; 

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css'
})
export class MessageListComponent {
  messages: Message[] = [
    new Message('1', 'Hello', 'Hi there!', 'Alice'),
    new Message('2', 'Reminder', 'Meeting at 2', 'Bob'),
    new Message('3', 'Update', 'New project assigned', 'Charlie'),
  ];
  
  onAddMessage(message: Message) {
    this.messages.push(message);
  }
  
}
