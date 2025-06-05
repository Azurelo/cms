import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({ providedIn: 'root' })
export class DocumentService {
  documents: Document[] = [];
  documentListChangedEvent = new Subject<Document[]>();
  maxDocumentId: number;

  constructor() {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  getDocuments(): Document[] {
    return this.documents.slice();
  }

  getDocument(id: string): Document {
    return this.documents.find(d => d.id === id);
  }

  getMaxId(): number {
    let maxId = 0;
    this.documents.forEach(document => {
      const currentId = parseInt(document.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    });
    return maxId;
  }

  addDocument(newDocument: Document): void {
    if (!newDocument) return;

    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument);
    this.documentListChangedEvent.next(this.documents.slice());
  }

  updateDocument(original: Document, updated: Document): void {
    if (!original || !updated) return;

    const pos = this.documents.indexOf(original);
    if (pos < 0) return;

    updated.id = original.id;
    this.documents[pos] = updated;
    this.documentListChangedEvent.next(this.documents.slice());
  }

  deleteDocument(document: Document): void {
    if (!document) return;

    const pos = this.documents.indexOf(document);
    if (pos < 0) return;

    this.documents.splice(pos, 1);
    this.documentListChangedEvent.next(this.documents.slice());
  }
}
