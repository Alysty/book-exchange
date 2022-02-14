import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BookCardService} from '../book-card/book-card.service';
import {Book} from '../custom-types/Book.model';
import {AlertController, LoadingController, Platform} from '@ionic/angular';
import {StorageService} from '../storage.service';
import {TradeService} from '../trade-service/trade.service';
import {Camera, CameraResultType, CameraSource, Photo} from '@capacitor/camera';
import {Directory, Filesystem} from '@capacitor/filesystem';

interface LocalFile{
  name: string;
  path: string;
  data: string;
}

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.page.html',
  styleUrls: ['./book-details.page.scss'],
})
export class BookDetailsPage implements OnInit {
  book: Book = {id: 0, title: '', price: 0, synopses: '', beingTraded: false, image: ''};
  creatingNewBookFlag = false;
  folder: string;
  imageDir = 'images';
  image: string;
  constructor(private activatedRoute: ActivatedRoute,
              private myBooksService: BookCardService,
              private router: Router,
              private alertController: AlertController,
              private tradeService: TradeService,
              private storage: StorageService,
              private platform: Platform,
              private loadingCtrl: LoadingController) {
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('book-id')) {
        this.creatingNewBookFlag = true;
        this.folder = 'MyBooks';
        return;
      }
      const bookId = paramMap.get('book-id');
      this.activatedRoute.queryParams.subscribe((params)=>{
        if(!this.folder){
          this.folder = params.folder;
        }
        if(this.folder === 'MyTrades'){
          this.folder = 'MyBooks';
        }
        if(this.folder === 'Trade'){
          this.tradeService.getTradeBookById(Number(bookId)).then((book)=> {
            this.book = book;
          }).catch(e => console.error(e));
        }else{
          this.myBooksService.getBookById(Number(bookId)).then((book)=> {
            this.book = book;
          }).catch(e => console.error(e));
        }
      });
    });
    console.log(this.book);
    this.loadFile();
  }
  addBook() {
    this.myBooksService.addBook(
      this.myBooksService.createBookDB(this.book.title, this.book.synopses, this.book.price, this.book.beingTraded, this.book.image)
    );
    this.router.navigate(['/main-page/MyBooks']);
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
            this.router.navigate(['/main-page/MyBooks']);
          }
        }
      ]
    }).then(alertEl => {
      alertEl.present();
    });
  }
  changeBook() {
    this.myBooksService.changeBook(this.book);
    this.router.navigate(['/main-page/MyBooks']);
  }
  buyBook(){
    this.tradeService.exchangeBook(this.book);
    this.router.navigate(['/main-page/Trade']);
  }
  checkValue(beingTraded) {
    if(beingTraded){
      this.book.beingTraded = true;
    }else{
      this.book.beingTraded = false;
    }
  }

  async loadFile(){
    const loading = await this.loadingCtrl.create({
      message: 'Loading data...'
    });
    await loading.present;
    console.log(this.book.image);
    Filesystem.readdir({
      directory: Directory.Data,
      path: this.imageDir
    }).then(result =>{
      this.loadFileData();
    }, async err =>{
      console.error('err', err);
      await Filesystem.mkdir({
        directory: Directory.Data,
        path: this.imageDir
      });
    }).then(_ =>{
      loading.dismiss();
    });
  }
  async loadFileData(){
    const readFile = await Filesystem.readFile({
      directory: Directory.Data,
      path: `${this.book.image}`
    });
    this.image = `data:image/jpeg;base64,${readFile.data}`;
  }
  async selectImage(){
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos
    });
    if(image){
      await this.saveImage(image);
    }
  }

  async saveImage(photo: Photo) {
    const base64Data = await this.readAsBase64(photo);
    const fileName = new Date().getTime()+ '.jpeg';
    const savedFile = await Filesystem.writeFile({
      directory: Directory.Data,
      path: `${this.imageDir}/${fileName}`,
      data: base64Data
    });
    this.book.image = `${this.imageDir}/${fileName}`;
    this.loadFile();
  }
  async readAsBase64(photo: Photo) {
    if (this.platform.is('hybrid')) {
      const file = await Filesystem.readFile({
        path: photo.path
      });

      return file.data;
    }
    else {
      const response = await fetch(photo.webPath);
      const blob = await response.blob();

      return await this.convertBlobToBase64(blob) as string;
    }
  }
  convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) =>{
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = ()=>{
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });
}
