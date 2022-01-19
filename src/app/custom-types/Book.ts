export class Book {
  //field
  public id: string;
  public title: string;
  public synopses: string;
  public price: number;
  //constructor
  constructor(id: string, title: string,synopses: string, price: number ) {
    this.title = title;
    this.synopses = synopses;
    this.price = price;
    this.id = id;
  }
}
