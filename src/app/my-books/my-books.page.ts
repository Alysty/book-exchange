import { Component, OnInit } from '@angular/core';
import {MyBooksService} from './my-books.service';
import {Book} from '../custom-types/Book.model';
@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.page.html',
  styleUrls: ['./my-books.page.scss'],
})
export class MyBooksPage implements OnInit {
  bookList: Book[];
  constructor(private myBooksService: MyBooksService) { }

  ngOnInit() {
    this.bookList = this.myBooksService.bookList;
  }

}
