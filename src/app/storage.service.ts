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
  private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
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
  getBooks(): Observable<any[]> {
    return this.books.asObservable();
  }
  addBook(bookDB: BookDB){
    this.database.executeSql('insert OR ignore into Book ( TITLE, SYNOPSIS, PRICE ) values (?1, ?2, ?3);',
      [bookDB.title, bookDB.synopses, bookDB.price]);
  }
  removeBook(id: number){
    this.database.executeSql('DELETE FROM  Book WHERE id = ?1;',
      [id]);
  }
  changeBook(book: Book){
    this.database.executeSql('UPDATE Book SET title = ?1, synopsis = ?2, price = ?3 WHERE id = ?4;',
      [book.title, book.synopses, book.price, book.id]);
  }
  private createTables(){
    this.httpClient.get('assets/dbTable.sql', {responseType: 'text'}).subscribe((sql)=>{
      this.sqlPorter.importSqlToDb(this.database,sql).then(()=>{
          this.seedDatabase();
      }).catch(e => console.error(e));
    });
  }
  private seedDatabase() {
    this.httpClient.get('assets/dbFill.sql', {responseType: 'text'})
      .subscribe((sql)=>{
        this.sqlPorter.importSqlToDb(this.database,sql)
          .then(()=>{
            this.loadBooks().then(()=> {this.dbReady.next(true);});
          })
          .catch(e => console.error(e));
      });
  }

  private loadBooks() {
    return this.database.executeSql('SELECT * from book', [])
      .then((data)=>{
        const books: Book[]= [];
        if (data.rows.length> 0){
          for (let i = 0; i < data.rows.length; i++){
            books.push({
              id: data.rows.item(i).id,
              title:data.rows.item(i).title,
              synopses:data.rows.item(i).synopses,
              price:data.rows.item(i).price
            });
          }
         }
        this.books.next(books);
      }).catch(e => console.error(e));
  }

}
