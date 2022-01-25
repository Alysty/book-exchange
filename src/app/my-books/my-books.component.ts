import {Component, Input, OnInit} from '@angular/core';
import {Book} from '../custom-types/Book.model';
@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.component.html',
  styleUrls: ['./my-books.component.scss'],
})
export class MyBooksComponent implements OnInit{
  @Input() book: Book;
  constructor() { }
  ngOnInit() {
  }

}
