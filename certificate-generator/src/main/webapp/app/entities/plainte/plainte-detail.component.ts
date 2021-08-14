import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPlainte } from 'app/shared/model/plainte.model';

@Component({
  selector: 'jhi-plainte-detail',
  templateUrl: './plainte-detail.component.html',
})
export class PlainteDetailComponent implements OnInit {
  plainte: IPlainte | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ plainte }) => (this.plainte = plainte));
  }

  previousState(): void {
    window.history.back();
  }
}
