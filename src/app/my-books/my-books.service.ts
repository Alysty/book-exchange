import {Injectable} from '@angular/core';
import {Book} from '../custom-types/Book.model';
import {StorageService} from '../storage.service';

@Injectable({
  providedIn: 'root'
})
export class MyBooksService {
  private bookListVariable: Book[] = [];
  constructor(storageService: StorageService) {
  }
  get bookList(): Book[] {
    return [...this.bookListVariable];
  }
  set bookList(value: Book[]) {
    this.bookListVariable = value;
  }
  findBookInList(id: string): Book{
    return {...this.bookList.find( book => book.id === id)};
  }
  addBook(book: Book): void{
  }
  deleteBook(id: string): boolean{
    const originalLength = this.bookList.length;
    this.bookList = this.bookList.filter(book => book.id !== id);
    return originalLength !== this.bookList.length;
  }
  changeBook(book: Book){
    const bookFromList = this.bookList.find(bookFoundOnList => bookFoundOnList.id === book.id);
    bookFromList.title = book.title;
    bookFromList.price = book.price;
    bookFromList.synopses = book.synopses;
  }
}
