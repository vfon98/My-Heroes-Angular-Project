import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { heroes } from './resources/hero-data';
import { Hero } from './hero';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb(): any {
  // { id: 1, name: 'Captain America'},
  // { id: 2, name: 'Iron Man'},
  // { id: 3, name: 'Hulk'},
  // { id: 4, name: 'Thor'},
  // { id: 5, name: 'Black Widow'},
  // { id: 6, name: 'Ant Man'},
  // { id: 7, name: 'War Machine'},
  // { id: 8, name: 'Spider Man'},
  // { id: 9, name: 'Star Lord'},
  // { id: 10, name: 'Captain Marvel'},
    return { heroes };
  }

  genId(heroes: Hero[]): any {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }
}
