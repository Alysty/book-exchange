import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MyBooksService} from '../my-books/my-books.service';
import {Book} from '../custom-types/Book.model';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.page.html',
  styleUrls: ['./book-details.page.scss'],
})
export class BookDetailsPage implements OnInit {
  book: Book;
  constructor(private activatedRoute: ActivatedRoute,
              private myBooksService: MyBooksService,
              private router: Router,
              private alertController: AlertController) {}
  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if(!paramMap.has('book-id')){
        this.router.navigate(['/folder/myBooks']);
        return;
      }
      const bookId= paramMap.get('book-id');
      this.book= this.myBooksService.findBookInList(bookId);
    });
  }
  deleteBook(){
    this.alertController.create({
      header: 'Please confirm your choice',
      message: 'Do you want to delete the book from your library ? this action is irreversible',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          handler: () => {
            this.myBooksService.deleteBook(this.book.id);
            this.router.navigate(['/folder/myBooks']);
          }
        }
      ]
    }).then(alertEl => {
      alertEl.present();
    });
  }
  changeBook(){
  }
}
