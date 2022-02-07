import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {StorageService} from '../storage.service';
import {Book} from '../custom-types/Book.model';

@Injectable({
  providedIn: 'root'
})
export class TradeServiceService {
  constructor(private storage: StorageService) {
  }
  exchangeBook(book: Book){
    this.storage.dbReady.subscribe(()=> this.storage.exchangeBooks(book));
  }
  getTradeBooks(): Observable<any[]> {
    return this.storage.getTradeBooks();
  }
  getTradeBookById(id: number){
    return this.storage.getTradeBookById(id);
  }
}
