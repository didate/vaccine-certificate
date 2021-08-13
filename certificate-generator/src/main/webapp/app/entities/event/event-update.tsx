import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ITrackerEntityInstance } from 'app/shared/model/tracker-entity-instance.model';
import { getEntities as getTrackerEntityInstances } from 'app/entities/tracker-entity-instance/tracker-entity-instance.reducer';
import { getEntity, updateEntity, createEntity, reset } from './event.reducer';
import { IEvent } from 'app/shared/model/event.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IEventUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EventUpdate = (props: IEventUpdateProps) => {
  const [teiId, setTeiId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { eventEntity, trackerEntityInstances, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/event' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getTrackerEntityInstances();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...eventEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="certificateGeneratorApp.event.home.createOrEditLabel">Create or edit a Event</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : eventEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="event-id">ID</Label>
                  <AvInput id="event-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="uidLabel" for="event-uid">
                  Uid
                </Label>
                <AvField
                  id="event-uid"
                  type="text"
                  name="uid"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="dateVaccinationLabel" for="event-dateVaccination">
                  Date Vaccination
                </Label>
                <AvField
                  id="event-dateVaccination"
                  type="date"
                  className="form-control"
                  name="dateVaccination"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="siteVaccinationLabel" for="event-siteVaccination">
                  Site Vaccination
                </Label>
                <AvField
                  id="event-siteVaccination"
                  type="text"
                  name="siteVaccination"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="typeVaccinLabel" for="event-typeVaccin">
                  Type Vaccin
                </Label>
                <AvField
                  id="event-typeVaccin"
                  type="text"
                  name="typeVaccin"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="lotLabel" for="event-lot">
                  Lot
                </Label>
                <AvField
                  id="event-lot"
                  type="text"
                  name="lot"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="doseLabel" for="event-dose">
                  Dose
                </Label>
                <AvField
                  id="event-dose"
                  type="text"
                  name="dose"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label for="event-tei">Tei</Label>
                <AvInput
                  id="event-tei"
                  type="select"
                  className="form-control"
                  name="tei.id"
                  value={isNew ? trackerEntityInstances[0] && trackerEntityInstances[0].id : eventEntity.tei?.id}
                  required
                >
                  {trackerEntityInstances
                    ? trackerEntityInstances.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
                <AvFeedback>This field is required.</AvFeedback>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/event" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">Back</span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp; Save
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  trackerEntityInstances: storeState.trackerEntityInstance.entities,
  eventEntity: storeState.event.entity,
  loading: storeState.event.loading,
  updating: storeState.event.updating,
  updateSuccess: storeState.event.updateSuccess,
});

const mapDispatchToProps = {
  getTrackerEntityInstances,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EventUpdate);
