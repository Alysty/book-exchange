import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../custom-types/Book';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;

  public bookList: Book[] = [new Book ('a', 'a','a',1), new Book ('a', 'a','a',1), new Book ('a', 'a','a',1)];

  constructor(private activatedRoute: ActivatedRoute) {}
  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }
}
