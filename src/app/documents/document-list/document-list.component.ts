import { Component, EventEmitter, Output } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[] = [
    new Document('1', 'Document A', 'Description A', 'http://example.com/docA', null),
    new Document('2', 'Document B', 'Description B', 'http://example.com/docB', null),
    new Document('3', 'Document C', 'Description C', 'http://example.com/docC', null),
    new Document('4', 'Document D', 'Description D', 'http://example.com/docD', null),
  ];

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }
}
