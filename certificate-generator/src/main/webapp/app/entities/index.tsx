import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import TrackerEntityInstance from './tracker-entity-instance';
import Generation from './generation';
import Event from './event';
import Signature from './signature';
import Plainte from './plainte';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}tracker-entity-instance`} component={TrackerEntityInstance} />
      <ErrorBoundaryRoute path={`${match.url}generation`} component={Generation} />
      <ErrorBoundaryRoute path={`${match.url}event`} component={Event} />
      <ErrorBoundaryRoute path={`${match.url}signature`} component={Signature} />
      <ErrorBoundaryRoute path={`${match.url}plainte`} component={Plainte} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
