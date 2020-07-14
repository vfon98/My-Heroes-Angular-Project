import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Hero } from './hero';
import { heroes } from './resources/hero-data';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// Rxjs for error handling
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private heroesUrl: string = '/api/heroes';
  private httpOptions: object = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  getHeroes(): Observable<Hero[]> {
    this.messageService.addMessage('HeroService: Fetched heroes');
    // return of(heroes);
    this.http.get(this.heroesUrl).subscribe(console.log);
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap(() => console.log('Fetched heroes')),
      catchError(this.handleError('getHeroes', []))
    );
  }

  getHeroById(id: number): Observable<Hero> {
    this.messageService.addMessage(`HeroService: Fetched hero id - ${id}`);
    const url = `${this.heroesUrl}/${id}`;
    // return of(heroes.find((hero) => hero.id === id));
    return this.http.get<Hero | any>(url).pipe(
      tap(() => console.log(`Fetched hero id - ${id}`)),
      catchError(this.handleError('getHeroById'))
    );
  }

  updateHero(hero: Hero): Observable<any> {
    console.log('hero', hero);
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(() => console.log('Updated hero')),
      catchError(this.handleError('updateHero'))
    );
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => console.log(`Added hero ${newHero.name}`)),
      catchError(this.handleError<Hero>('AddHero'))
    );
  }

  deleteHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(() => console.log('Deleted hero')),
      catchError(this.handleError<Hero>('DeleteHero'))
    );
  }

  searchHero(keyword: string): Observable<Hero[]> {
    console.log('keyword', keyword);
    if (!keyword.trim()) return of([]);
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${keyword}`).pipe(
      tap((result) =>
        result.length
          ? this.log(`Found ${result.length} results`)
          : this.log('No matching result')
      ),
      catchError(this.handleError<Hero[]>('Search Hero', []))
    );
  }

  private log(message: String) {
    this.messageService.addMessage(`HeroService: ${message}`);
  }

  private handleError<T>(operation: string = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
