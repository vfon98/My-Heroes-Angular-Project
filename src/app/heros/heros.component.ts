import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { heroes } from '../resources/hero-data';

@Component({
  selector: 'app-heros',
  templateUrl: './heros.component.html',
  styleUrls: ['./heros.component.scss'],
})
export class HerosComponent implements OnInit {
  heroes: Hero[] = heroes;
  selectedHero: Hero;

  constructor() {}

  ngOnInit(): void {}

  onSelect(hero: Hero) {
    console.log(hero);
    this.selectedHero = hero;
  }
}
