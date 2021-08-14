import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';

import { ITrackerEntityInstance } from 'app/shared/model/tracker-entity-instance.model';
import { TrackerEntityInstanceService } from './tracker-entity-instance.service';
import { IEvent } from 'app/shared/model/event.model';

@Component({
  selector: 'jhi-tracker-entity-instance-detail',
  templateUrl: './tracker-entity-instance-detail.component.html',
})
export class TrackerEntityInstanceDetailComponent implements OnInit {
  trackerEntityInstance: ITrackerEntityInstance | null = null;
  events?: IEvent[];

  constructor(protected activatedRoute: ActivatedRoute, protected trackerEntityInstanceService: TrackerEntityInstanceService) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ trackerEntityInstance }) => (this.trackerEntityInstance = trackerEntityInstance));

    if (this.trackerEntityInstance) {
      this.trackerEntityInstanceService.findEvent(this.trackerEntityInstance.id).subscribe((res: HttpResponse<IEvent[]>) => {
        this.events = res.body || [];
        console.log(this.events);
      });
    }
  }

  trackId(index: number, item: IEvent): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  previousState(): void {
    window.history.back();
  }
}
