import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from '../hero.service';
import { Location } from '@angular/common';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss'],
})
export class HeroDetailComponent implements OnInit {
  // @Input() hero: Hero;
  public hero: Hero;

  constructor(
    private route: ActivatedRoute,
    private heroSerive: HeroService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    const id = parseInt(this.route.snapshot.params.id);
    this.heroSerive.getHeroById(id).subscribe((hero) => {
      this.hero = hero;
    });
  }

  saveHero(): void {
    this.heroSerive.updateHero(this.hero).subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }
}
