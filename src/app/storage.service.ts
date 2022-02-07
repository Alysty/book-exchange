import {Injectable} from '@angular/core';
import {Platform} from '@ionic/angular';
import {SQLiteObject, SQLite} from '@awesome-cordova-plugins/sqlite/ngx';
import {SQLitePorter} from '@ionic-native/sqlite-porter/ngx';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Book, BookDB} from './custom-types/Book.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private database: SQLiteObject;
  private dbReadyVar: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private books =  new BehaviorSubject([]);
  private tradeBooks = new BehaviorSubject([]);
  constructor(private plt: Platform, private sqlite: SQLite, private sqlPorter: SQLitePorter, private httpClient: HttpClient) {
    this.plt.ready().then(()=>{
      this.sqlite.create({
        name: 'data.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          this.database = db;
          this.createTables();
        })
        .catch(e => console.error(e));
    });
  }
  get dbReady(): BehaviorSubject<boolean> {
    return this.dbReadyVar;
  }
  getBooks(): Observable<any[]> {
    return this.books.asObservable();
  }
  getTradeBooks(): Observable<any[]> {
    return this.tradeBooks.asObservable();
  }
  addBook(bookDB: BookDB){
    this.database.executeSql('insert OR ignore into Book ( TITLE, SYNOPSIS, PRICE, BEING_TRADED) values (?1, ?2, ?3, ?4);',
      [bookDB.title, bookDB.synopses, bookDB.price, bookDB.beingTraded]).catch(e => console.error(e));
    this.loadBooks();
  }
  removeBook(id: number){
    this.database.executeSql('DELETE FROM  Book WHERE id = ?1;',
      [id]).catch(e => console.error(e));
    this.loadBooks();
  }
  changeBook(book: Book){
    this.database.executeSql('UPDATE Book SET title = ?1, synopsis = ?2, price = ?3, BEING_TRADED = ?4 WHERE id = ?5;',
      [book.title, book.synopses, book.price, book.beingTraded, book.id]).catch(e => console.error(e));
    this.loadBooks();
  }
  getBookById(id: number): Promise<Book>{
    return this.database.executeSql('SELECT * FROM Book WHERE id = ?1', [id])
      .then((data)=>{
        if (data.rows.length> 0){
          return {
            id: data.rows.item(0).ID,
            title:data.rows.item(0).TITLE,
            synopses:data.rows.item(0).SYNOPSIS,
            price:data.rows.item(0).PRICE,
            beingTraded:data.rows.item(0).BEING_TRADED
          };
        }else {
          throw new Error('Book not found');
        }
      }).catch(e =>{throw e;});
  }
  getTradeBookById(id: number): Promise<Book>{
    return this.database.executeSql('SELECT * FROM BookInTrade WHERE id = ?1', [id])
      .then((data)=>{
        if (data.rows.length> 0){
          return {
            id: data.rows.item(0).ID,
            title:data.rows.item(0).TITLE,
            synopses:data.rows.item(0).SYNOPSIS,
            price:data.rows.item(0).PRICE,
            beingTraded: true
          };
        }else {
          throw new Error('Book not found');
        }
      }).catch(e =>{throw e;});
  }
  exchangeBooks(book: Book){
    this.database.executeSql('insert OR ignore into Book ( TITLE, SYNOPSIS, PRICE, BEING_TRADED) values (?1, ?2, ?3, ?4);',
      [book.title, book.synopses, book.price, false]).catch(e => console.error(e));
    this.database.executeSql('DELETE FROM  BookInTrade WHERE id = ?1;',
      [book.id]).catch(e => console.error(e));
    this.loadBooks();
    this.loadTradeBooks();
  }
  private createTables(){
    this.httpClient.get('assets/dbTable.sql', {responseType: 'text'}).subscribe((sql)=>{
      this.sqlPorter.importSqlToDb(this.database,sql).then(()=>{
        this.loadBooks().then(()=> {this.dbReadyVar.next(true);});
      }).catch(e => console.error(e));
    });
  }
  private loadBooks() {
    return this.database.executeSql('SELECT * from book', [])
      .then((data)=>{
        const books: Book[]= [];
        if (data.rows.length> 0){
          for (let i = 0; i < data.rows.length; i++){
            books.push({
              id: data.rows.item(i).ID,
              title:data.rows.item(i).TITLE,
              synopses:data.rows.item(i).SYNOPSIS,
              price:data.rows.item(i).PRICE,
              beingTraded:data.rows.item(i).BEING_TRADED
            });
          }
        }
        this.books.next(books);
      }).catch(e => console.error(e));
  }
  private loadTradeBooks() {
    return this.database.executeSql('SELECT * from BookInTrade', [])
      .then((data)=>{
        const tradeBooks: Book[]= [];
        if (data.rows.length> 0){
          for (let i = 0; i < data.rows.length; i++){
            tradeBooks.push({
              id: data.rows.item(i).ID,
              title:data.rows.item(i).TITLE,
              synopses:data.rows.item(i).SYNOPSIS,
              price:data.rows.item(i).PRICE,
              beingTraded: true
            });
          }
        }
        this.tradeBooks.next(tradeBooks);
      }).catch(e => console.error(e));
  }

  //FUNCTION seedDatabase MADE FOR TESTING ONLY, adds 3 entries to the database
  private seedTradeDatabase() {
    this.httpClient.get('assets/dbFill.sql', {responseType: 'text'})
      .subscribe((sql)=>{
        this.sqlPorter.importSqlToDb(this.database,sql)
          .then(()=>{
            this.loadBooks().then(()=> {this.dbReadyVar.next(true);});
          })
          .catch(e => console.error(e));
      });
  }

}
