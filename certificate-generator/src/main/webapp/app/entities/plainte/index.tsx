import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Plainte from './plainte';
import PlainteDetail from './plainte-detail';
import PlainteUpdate from './plainte-update';
import PlainteDeleteDialog from './plainte-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PlainteUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PlainteUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PlainteDetail} />
      <ErrorBoundaryRoute path={match.url} component={Plainte} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={PlainteDeleteDialog} />
  </>
);

export default Routes;
