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
  addBook(bookDB: BookDB){
    this.database.executeSql('insert OR ignore into Book ( TITLE, SYNOPSIS, PRICE ) values (?1, ?2, ?3);',
      [bookDB.title, bookDB.synopses, bookDB.price]).catch(e => console.error(e));
    this.loadBooks();
  }
  removeBook(id: number){
    this.database.executeSql('DELETE FROM  Book WHERE id = ?1;',
      [id]).catch(e => console.error(e));
    this.loadBooks();
  }
  changeBook(book: Book){
    this.database.executeSql('UPDATE Book SET title = ?1, synopsis = ?2, price = ?3 WHERE id = ?4;',
      [book.title, book.synopses, book.price, book.id]).catch(e => console.error(e));
    this.loadBooks();
  }
  getBookById(id: number): Promise<Book>{
    return this.database.executeSql('SELECT * FROM Book WHERE id = ?1', [id])
      .then((data)=>{
        if (data.rows.length> 0){
          return {
            id: data.rows.item(0).id,
            title:data.rows.item(0).title,
            synopses:data.rows.item(0).synopses,
            price:data.rows.item(0).price
          };
        }else {
          throw new Error('Book not found');
        }
    }).catch(e =>{throw e;});
  }
  private createTables(){
    this.httpClient.get('assets/dbTable.sql', {responseType: 'text'}).subscribe((sql)=>{
      this.sqlPorter.importSqlToDb(this.database,sql).then(()=>{
        this.loadBooks().then(()=> {this.dbReadyVar.next(true);});
      }).catch(e => console.error(e));
    });
  }
  private seedDatabase() {
    this.httpClient.get('assets/dbFill.sql', {responseType: 'text'})
      .subscribe((sql)=>{
        this.sqlPorter.importSqlToDb(this.database,sql)
          .then(()=>{
            this.loadBooks().then(()=> {this.dbReadyVar.next(true);});
          })
          .catch(e => console.error(e));
      });
  }

  private loadBooks() {
    return this.database.executeSql('SELECT * from book', [])
      .then((data)=>{
        console.log(data.rows.item(0));
        const books: Book[]= [];
        if (data.rows.length> 0){
          for (let i = 0; i < data.rows.length; i++){
            books.push({
              id: data.rows.item(i).ID,
              title:data.rows.item(i).PRICE,
              synopses:data.rows.item(i).SYNOPSIS,
              price:data.rows.item(i).TITLE
            });
          }
        }
        this.books.next(books);
      }).catch(e => console.error(e));
  }

}
