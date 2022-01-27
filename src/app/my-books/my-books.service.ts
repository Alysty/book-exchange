import {Injectable} from '@angular/core';
import {Book, BookDB} from '../custom-types/Book.model';
import {StorageService} from '../storage.service';

@Injectable({
  providedIn: 'root'
})
export class MyBooksService {
  constructor(private storage: StorageService) {
  }
  addBook(bookDB: BookDB){
    this.storage.addBook(bookDB);
  }
  removeBook(id: number){
    this.storage.removeBook(id);
  }
  changeBook(book: Book){
    this.storage.changeBook(book);
  }
  createBookDB(title: string, synopses: string, price: number): BookDB{
    return {title, synopses, price};
  }
}
