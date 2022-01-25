import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {MyBooksService} from '../my-books/my-books.service';
import {Book} from '../custom-types/Book.model';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  public bookList: Book[];

  constructor(private activatedRoute: ActivatedRoute, private myBooksService: MyBooksService) {}
  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }
  ionViewWillEnter(){
    this.bookList = this.myBooksService.bookList;
  }
}
