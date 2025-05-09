import { Component } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent {
  documents: Document[] = [
    new Document('1', 'Doc 1', 'Description 1', 'http://example.com/doc1', null),
    new Document('2', 'Doc 2', 'Description 2', 'http://example.com/doc2', null)
  ];
}
