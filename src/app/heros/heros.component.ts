import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
// import { heroes } from '../resources/hero-data';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';
import { Observer, of } from 'rxjs';

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

  addHero(name: String): void {
    name = name.trim();
    if (!name) return;
    this.heroService
      .addHero({ name } as Hero)
      .subscribe((hero) => this.heroes.push(hero));
  }

  deleteHero(id: number) {
    this.heroes = this.heroes.filter(hero => hero.id !== id);
    this.heroService.deleteHero(id).subscribe();
  }

  // searchHero(keyword: string): Observer<Hero[]> {}
}
