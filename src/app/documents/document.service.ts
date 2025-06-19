import { Injectable } from '@angular/core';
import { Document } from './document.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class DocumentService {
  private documents: Document[] = [];
  documentListChangedEvent = new Subject<Document[]>();
  maxDocumentId: number;
  
  private firebaseUrl = 'https://cmsp-224f8-default-rtdb.firebaseio.com/documents.json';

  constructor(private http: HttpClient) {
    this.getDocuments(); // load initial data
  }

  getDocuments(): void {
    this.http.get<Document[]>(this.firebaseUrl).subscribe(
      (docs: Document[]) => {
        this.documents = docs || [];
        this.maxDocumentId = this.getMaxId(); 
        this.documents.sort((a, b) => a.name.localeCompare(b.name));
        this.documentListChangedEvent.next(this.documents.slice());
      },
      (error: any) => {
        console.error('Failed to load documents:', error);
      }
    );
  }

  storeDocuments(): void {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.put(this.firebaseUrl, this.documents, { headers })
      .subscribe(() => {
        this.documentListChangedEvent.next(this.documents.slice());
      });
  }

  addDocument(newDoc: Document): void {
    if (!newDoc) { return; }
    this.maxDocumentId++;
    newDoc.id = this.maxDocumentId.toString();
    this.documents.push(newDoc);
    this.storeDocuments();
  }

  updateDocument(original: Document, updated: Document): void {
    if (!original || !updated) { return; }
    const pos = this.documents.indexOf(original);
    if (pos < 0) { return; }
    updated.id = original.id;
    this.documents[pos] = updated;
    this.storeDocuments();
  }

  deleteDocument(doc: Document): void {
    if (!doc) { return; }
    const pos = this.documents.indexOf(doc);
    if (pos < 0) { return; }
    this.documents.splice(pos, 1);
    this.storeDocuments();
  }


  private getMaxId(): number {
    return this.documents.reduce((max, doc) => {
      const current = parseInt(doc.id, 10);
      return !isNaN(current) && current > max ? current : max;
    }, 0);
  }


  getDocument(id: string): Document | null {
    return this.documents.find(d => d.id === id) || null;
  }
}
