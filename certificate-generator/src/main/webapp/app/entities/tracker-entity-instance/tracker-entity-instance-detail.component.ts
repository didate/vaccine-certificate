import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITrackerEntityInstance } from 'app/shared/model/tracker-entity-instance.model';

@Component({
  selector: 'jhi-tracker-entity-instance-detail',
  templateUrl: './tracker-entity-instance-detail.component.html',
})
export class TrackerEntityInstanceDetailComponent implements OnInit {
  trackerEntityInstance: ITrackerEntityInstance | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ trackerEntityInstance }) => (this.trackerEntityInstance = trackerEntityInstance));
  }

  previousState(): void {
    window.history.back();
  }
}
