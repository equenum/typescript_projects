import 'reflect-metadata'; // provides a means to interact with metadata associated with decorators
import _ from 'lodash'; // a bunch of useful utility methods
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

import { Product } from './product.model';

console.log(_.shuffle([1, 2, 3, 4, 5]));
const product = new Product('Book', 6.99);

console.log(product.getInformation());

const noNameProducts = [
  { title: 'Car', price: 1000 },
  { title: 'House', price: 1000000 }
];

const mappedProducts = plainToInstance(Product, noNameProducts);

for (let product of mappedProducts) {
  console.log(product.getInformation());
}

const valProduct = new Product('', -10);
validate(valProduct).then((errors) => {
  if (errors.length > 0) {
    console.log('Validation errors found!');
    console.log(errors);
  } else {
    console.log(valProduct.getInformation());
  }
});

console.log(valProduct);
