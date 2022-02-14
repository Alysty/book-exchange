export interface Book{
  id: number;
  title: string;
  synopses: string;
  price: number;
  beingTraded: boolean;
  image: string;
}
export interface BookDB{
  title: string;
  synopses: string;
  price: number;
  beingTraded: boolean;
  image: string;
}
