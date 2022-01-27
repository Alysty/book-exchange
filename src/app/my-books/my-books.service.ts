import {Injectable, Input} from '@angular/core';
import {Book, BookDB} from '../custom-types/Book.model';
import {StorageService} from '../storage.service';
import {Observable, Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyBooksService {
  @Input() book: Book;
  constructor(private storage: StorageService) {
  }
  addBook(bookDB: BookDB){
    this.storage.dbReady.subscribe(()=>this.storage.addBook(bookDB));
  }
  removeBook(id: number){
    this.storage.dbReady.subscribe(()=>this.storage.removeBook(id));
  }
  changeBook(book: Book){
    this.storage.dbReady.subscribe(()=> this.storage.changeBook(book));
  }
  getBooks(): Observable<any[]> {
    return this.storage.getBooks();
  }
  getBookById(id: number){
    return this.storage.getBookById(id);
  }
  createBookDB(title: string, synopses: string, price: number): BookDB{
    return {title, synopses, price};
  }
}
