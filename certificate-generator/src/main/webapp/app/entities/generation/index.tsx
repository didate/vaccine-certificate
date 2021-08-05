import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Generation from './generation';
import GenerationDetail from './generation-detail';
import GenerationUpdate from './generation-update';
import GenerationDeleteDialog from './generation-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={GenerationUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={GenerationUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={GenerationDetail} />
      <ErrorBoundaryRoute path={match.url} component={Generation} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={GenerationDeleteDialog} />
  </>
);

export default Routes;
