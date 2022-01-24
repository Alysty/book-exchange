import { Injectable } from '@angular/core';
import {Book} from '../custom-types/Book.model';

@Injectable({
  providedIn: 'root'
})
export class MyBooksService {
  private bookListVariable: Book[] =
    [{id: 'a', title:'a', synopses:'a', price:1},
      {id: 'ab', title:'a', synopses:'a', price:1},
      {id: 'ad', title:'a', synopses:'a', price:1}];
  constructor() { }
  get bookList(): Book[] {
    return this.bookListVariable;
  }
  set bookList(value: Book[]) {
    this.bookListVariable = value;
  }
  findBookInList(id: string): Book{
    return this.bookList.find( book => book.id === id);
  }
  deleteBook(id: string): boolean{
    const originalLength = this.bookList.length;
    this.bookList = this.bookList.filter(book => book.id !== id);
    return originalLength !== this.bookList.length;
  }
  addBook(book: Book): void{
    this.bookList.push(book);
  }
  createBook(title: string, synopses: string, price: string): Book{
    // temporary way of making unique id, must be changed
    return {id: this.bookList[this.bookList.length - 1].id + 'a', title:'a', synopses:'a', price:1};
  }
}
