import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Trade', url: '/main-page/Trade', icon: '' },
    { title: 'My Books', url: '/main-page/MyBooks', icon: 'albums' },
    { title: 'My Trades', url: '/main-page/MyTrades', icon: '' },
  ];
  constructor() {

  }
}
