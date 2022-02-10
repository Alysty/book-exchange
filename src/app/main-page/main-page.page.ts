import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {BookCardService} from '../book-card/book-card.service';
import {Book} from '../custom-types/Book.model';
import {TradeService} from '../trade-service/trade.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.page.html',
  styleUrls: ['./main-page.page.scss'],
})
export class MainPagePage implements OnInit {
  public folder: string;
  public bookList: Book[] = [];
  public bookTradeList: Book[] = [];
  public myTradeList: Book[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private myBooksService: BookCardService,
              private tradeServiceService: TradeService) {
  }
  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }
  ionViewWillEnter(){
    switch ( this.folder ) {
      case 'Trade':
        this.tradeServiceService.getTradeBooks().subscribe((books)=>{
          this.bookTradeList = books;
        });
        break;
      case 'MyTrades':
        this.myBooksService.getBooks().subscribe((books)=>{
          // @ts-ignore
          this.myTradeList = books.filter((book)=>book.beingTraded === 'true');
        });
        break;
      default:
        this.myBooksService.getBooks().subscribe((books)=>{
          this.bookList = books;
        });
        break;
    }


  }
}
