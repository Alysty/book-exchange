import {Component, Input, OnInit} from '@angular/core';
import {Book} from '../custom-types/Book.model';
@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.page.html',
  styleUrls: ['./my-books.page.scss'],
})
export class MyBooksPage implements OnInit{
  @Input() book: Book;
  constructor() { }
  ngOnInit() {
  }

}
