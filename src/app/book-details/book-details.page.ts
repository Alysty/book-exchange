import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MyBooksService} from '../my-books/my-books.service';
import {Book} from '../custom-types/Book.model';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.page.html',
  styleUrls: ['./book-details.page.scss'],
})
export class BookDetailsPage implements OnInit {
  book: Book;
  constructor(private activatedRoute: ActivatedRoute, private myBooksService: MyBooksService) {}
  ngOnInit() {
    const bookId= this.activatedRoute.snapshot.paramMap.get('book-id');
    this.book= this.myBooksService.findBookInList(bookId);
  }
}
