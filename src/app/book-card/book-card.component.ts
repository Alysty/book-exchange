import {Component, Input, OnInit} from '@angular/core';
import {Book} from '../custom-types/Book.model';
@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss'],
})
export class BookCardComponent implements OnInit{
  @Input() book: Book;
  @Input() folder: string;
  constructor() { }
  ngOnInit() {
  }

}
