export interface Book{
  //field
  id: number;
  title: string;
  synopses: string;
  price: number;
  beingTraded: boolean;
}
export interface BookDB{
  title: string;
  synopses: string;
  price: number;
  beingTraded: boolean;
}
