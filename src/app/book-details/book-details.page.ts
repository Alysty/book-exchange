import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BookCardService} from '../book-card/book-card.service';
import {Book} from '../custom-types/Book.model';
import {AlertController} from '@ionic/angular';
import {StorageService} from '../storage.service';
import {TradeService} from "../trade-service/trade.service";

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.page.html',
  styleUrls: ['./book-details.page.scss'],
})
export class BookDetailsPage implements OnInit {
  book: Book = {id: 0, title: '', price: 0, synopses: '', beingTraded: false};
  creatingNewBookFlag = false;
  folder: string;
  constructor(private activatedRoute: ActivatedRoute,
              private myBooksService: BookCardService,
              private router: Router,
              private alertController: AlertController,
              private tradeService: TradeService,
              private storage: StorageService) {
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('book-id')) {
        this.creatingNewBookFlag = true;
        return;
      }
      const bookId = paramMap.get('book-id');
      this.activatedRoute.queryParams.subscribe((params)=>{
        this.folder = params.folder;
        if(this.folder === 'MyTrades'){
          this.folder = 'MyBooks';
        }
        if(this.folder === 'Trade'){
          this.tradeService.getTradeBookById(Number(bookId)).then((book)=> {
            this.book = book;
          }).catch(e => console.error(e));
        }else{
          this.myBooksService.getBookById(Number(bookId)).then((book)=> {
            this.book = book;
          }).catch(e => console.error(e));
        }
      });
    });
  }
  addBook() {
    this.myBooksService.addBook(
      this.myBooksService.createBookDB(this.book.title, this.book.synopses, this.book.price, this.book.beingTraded)
    );
    this.router.navigate(['/main-page/MyBooks']);
  }
  deleteBook() {
    this.alertController.create({
      header: 'Please confirm your choice',
      message: 'Do you want to delete the book from your library ? this action is irreversible',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          handler: () => {
            this.myBooksService.removeBook(this.book.id);
            this.router.navigate(['/main-page/MyBooks']);
          }
        }
      ]
    }).then(alertEl => {
      alertEl.present();
    });
  }
  changeBook() {
    this.myBooksService.changeBook(this.book);
    this.router.navigate(['/main-page/MyBooks']);
  }
  buyBook(){
    this.tradeService.exchangeBook(this.book);
    this.router.navigate(['/main-page/Trade']);
  }
}
