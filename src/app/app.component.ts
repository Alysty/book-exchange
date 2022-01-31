import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Trade', url: '/folder/Trade', icon: '' },
    { title: 'My Books', url: '/folder/MyBooks', icon: 'albums' },
  ];
  constructor() {}
}
