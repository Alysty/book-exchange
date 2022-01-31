import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MyBooksService} from '../my-books/my-books.service';
import {Book} from '../custom-types/Book.model';
import {AlertController} from '@ionic/angular';
import {StorageService} from '../storage.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.page.html',
  styleUrls: ['./book-details.page.scss'],
})
export class BookDetailsPage implements OnInit {
  book: Book = {id: 0, title: '', price: 0, synopses: ''};
  creatingNewBookFlag = false;

  constructor(private activatedRoute: ActivatedRoute,
              private myBooksService: MyBooksService,
              private router: Router,
              private alertController: AlertController,
              private storage: StorageService) {
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('book-id')) {
        this.creatingNewBookFlag = true;
        return;
      }
      const bookId = paramMap.get('book-id');
        this.myBooksService.getBookById(Number(bookId)).then((book)=> {
          this.book = book;
        }).catch(e => console.error(e));
    });
  }
  numericOnly(event): boolean {
    const pattern = /^([0-9])$/;
    return pattern.test(event.key);
  }
  addBook() {
    this.myBooksService.addBook(
      this.myBooksService.createBookDB(this.book.title, this.book.synopses, this.book.price)
    );
    this.router.navigate(['/main-page/myBooks']);
  }
  deleteBook() {
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
            this.myBooksService.removeBook(this.book.id);
            this.router.navigate(['/main-page/myBooks']);
          }
        }
      ]
    }).then(alertEl => {
      alertEl.present();
    });
  }
  changeBook() {
    this.myBooksService.changeBook(this.book);
    this.router.navigate(['/main-page/myBooks']);
  }

}
