import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import TrackerEntityInstance from './tracker-entity-instance';
import TrackerEntityInstanceDetail from './tracker-entity-instance-detail';
import TrackerEntityInstanceUpdate from './tracker-entity-instance-update';
import TrackerEntityInstanceDeleteDialog from './tracker-entity-instance-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={TrackerEntityInstanceUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={TrackerEntityInstanceUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={TrackerEntityInstanceDetail} />
      <ErrorBoundaryRoute path={match.url} component={TrackerEntityInstance} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={TrackerEntityInstanceDeleteDialog} />
  </>
);

export default Routes;
