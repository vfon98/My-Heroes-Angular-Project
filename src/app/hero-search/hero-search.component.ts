import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.scss'],
})
export class HeroSearchComponent implements OnInit {
  public heroes$: Observable<Hero[]>;
  private keywords = new Subject<String>();

  constructor(private heroService: HeroService) {}

  search(keyword: string): void {
    this.keywords.next(keyword);
  }

  ngOnInit(): void {
    this.heroes$ = this.keywords.pipe(
      // Wait for 300ms
      debounceTime(300),

      // Ignore new keyword that similar to the previous
      distinctUntilChanged(),

      // Swich observable when the new keyword changes
      switchMap((keyword: string) => this.heroService.searchHero(keyword))
    );
  }
}
