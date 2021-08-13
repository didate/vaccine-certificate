import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './event.reducer';
import { IEvent } from 'app/shared/model/event.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEventDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EventDetail = (props: IEventDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { eventEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          Event [<b>{eventEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="uid">Uid</span>
          </dt>
          <dd>{eventEntity.uid}</dd>
          <dt>
            <span id="dateVaccination">Date Vaccination</span>
          </dt>
          <dd>
            {eventEntity.dateVaccination ? (
              <TextFormat value={eventEntity.dateVaccination} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="siteVaccination">Site Vaccination</span>
          </dt>
          <dd>{eventEntity.siteVaccination}</dd>
          <dt>
            <span id="typeVaccin">Type Vaccin</span>
          </dt>
          <dd>{eventEntity.typeVaccin}</dd>
          <dt>
            <span id="lot">Lot</span>
          </dt>
          <dd>{eventEntity.lot}</dd>
          <dt>
            <span id="dose">Dose</span>
          </dt>
          <dd>{eventEntity.dose}</dd>
          <dt>Tei</dt>
          <dd>{eventEntity.tei ? eventEntity.tei.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/event" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/event/${eventEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ event }: IRootState) => ({
  eventEntity: event.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EventDetail);
