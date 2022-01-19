import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.page.html',
  styleUrls: ['./book-details.page.scss'],
})
export class BookDetailsPage implements OnInit {
  id: string;
  constructor(private activatedRoute: ActivatedRoute) {}
  ngOnInit() {
    this.id= this.activatedRoute.snapshot.paramMap.get('id');
  }

}
