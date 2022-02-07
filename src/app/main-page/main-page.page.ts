import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {BookCardService} from '../book-card/book-card.service';
import {Book} from '../custom-types/Book.model';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.page.html',
  styleUrls: ['./main-page.page.scss'],
})
export class MainPagePage implements OnInit {
  public folder: string;
  public bookList: Book[] = [];
  public bookTradeList: Book[] = [];

  constructor(private activatedRoute: ActivatedRoute, private myBooksService: BookCardService) {}
  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }
  ionViewWillEnter(){
    switch ( this.folder ) {
      case 'Trade':
        console.error('asda');
        break;
      default:
        this.myBooksService.getBooks().subscribe((books)=>{
          this.bookList = books;
        });
        break;
    }


  }
}
