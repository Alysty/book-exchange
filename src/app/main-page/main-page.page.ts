import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {MyBooksService} from '../my-books/my-books.service';
import {Book} from '../custom-types/Book.model';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.page.html',
  styleUrls: ['./main-page.page.scss'],
})
export class MainPagePage implements OnInit {
  public folder: string;
  public bookList: Book[] = [];

  constructor(private activatedRoute: ActivatedRoute, private myBooksService: MyBooksService) {}
  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }
  ionViewWillEnter(){
    this.myBooksService.getBooks().subscribe((books)=>{
      this.bookList = books;
    });
  }
}
