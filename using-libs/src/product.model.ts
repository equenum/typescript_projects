import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class Product {
  @IsNotEmpty()
  readonly title: string;

  @IsNumber()
  @IsPositive()
  readonly price: number;

  constructor(title: string, price: number) {
    this.title = title;
    this.price = price;
  }

  getInformation() {
    return [this.title, `${this.price}`];
  }
}
