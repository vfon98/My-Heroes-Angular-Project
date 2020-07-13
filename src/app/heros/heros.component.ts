import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
// import { heroes } from '../resources/hero-data';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heros',
  templateUrl: './heros.component.html',
  styleUrls: ['./heros.component.scss'],
})
export class HerosComponent implements OnInit {
  heroes: Hero[];
  selectedHero: Hero;

  constructor(
    private heroService: HeroService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe((heroes) => (this.heroes = heroes));
  }

  onSelect(hero: Hero) {
    console.log(hero);
    this.messageService.addMessage(`HeroesComponent: Selected hero with id - ${hero.id}`)
    this.selectedHero = hero;
  }
}
