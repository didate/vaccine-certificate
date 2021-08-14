import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGeneration } from 'app/shared/model/generation.model';

@Component({
  selector: 'jhi-generation-detail',
  templateUrl: './generation-detail.component.html',
})
export class GenerationDetailComponent implements OnInit {
  generation: IGeneration | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ generation }) => (this.generation = generation));
  }

  previousState(): void {
    window.history.back();
  }
}
