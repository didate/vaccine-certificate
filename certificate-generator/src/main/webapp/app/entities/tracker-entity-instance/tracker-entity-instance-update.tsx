import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './tracker-entity-instance.reducer';
import { ITrackerEntityInstance } from 'app/shared/model/tracker-entity-instance.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ITrackerEntityInstanceUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const TrackerEntityInstanceUpdate = (props: ITrackerEntityInstanceUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { trackerEntityInstanceEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/tracker-entity-instance' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...trackerEntityInstanceEntity,
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
          <h2 id="certificateGeneratorApp.trackerEntityInstance.home.createOrEditLabel">Create or edit a TrackerEntityInstance</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : trackerEntityInstanceEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="tracker-entity-instance-id">ID</Label>
                  <AvInput id="tracker-entity-instance-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="uidLabel" for="tracker-entity-instance-uid">
                  Uid
                </Label>
                <AvField
                  id="tracker-entity-instance-uid"
                  type="text"
                  name="uid"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="nomLabel" for="tracker-entity-instance-nom">
                  Nom
                </Label>
                <AvField
                  id="tracker-entity-instance-nom"
                  type="text"
                  name="nom"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="prenomLabel" for="tracker-entity-instance-prenom">
                  Prenom
                </Label>
                <AvField
                  id="tracker-entity-instance-prenom"
                  type="text"
                  name="prenom"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="sexeLabel" for="tracker-entity-instance-sexe">
                  Sexe
                </Label>
                <AvField
                  id="tracker-entity-instance-sexe"
                  type="text"
                  name="sexe"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="professionLabel" for="tracker-entity-instance-profession">
                  Profession
                </Label>
                <AvField
                  id="tracker-entity-instance-profession"
                  type="text"
                  name="profession"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="ageLabel" for="tracker-entity-instance-age">
                  Age
                </Label>
                <AvField
                  id="tracker-entity-instance-age"
                  type="string"
                  className="form-control"
                  name="age"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' },
                    number: { value: true, errorMessage: 'This field should be a number.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="regionLabel" for="tracker-entity-instance-region">
                  Region
                </Label>
                <AvField
                  id="tracker-entity-instance-region"
                  type="text"
                  name="region"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="prefectureLabel" for="tracker-entity-instance-prefecture">
                  Prefecture
                </Label>
                <AvField
                  id="tracker-entity-instance-prefecture"
                  type="text"
                  name="prefecture"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="sousPrefectureLabel" for="tracker-entity-instance-sousPrefecture">
                  Sous Prefecture
                </Label>
                <AvField id="tracker-entity-instance-sousPrefecture" type="text" name="sousPrefecture" />
              </AvGroup>
              <AvGroup>
                <Label id="quartierLabel" for="tracker-entity-instance-quartier">
                  Quartier
                </Label>
                <AvField
                  id="tracker-entity-instance-quartier"
                  type="text"
                  name="quartier"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="villageLabel" for="tracker-entity-instance-village">
                  Village
                </Label>
                <AvField id="tracker-entity-instance-village" type="text" name="village" />
              </AvGroup>
              <AvGroup>
                <Label id="telephoneLabel" for="tracker-entity-instance-telephone">
                  Telephone
                </Label>
                <AvField
                  id="tracker-entity-instance-telephone"
                  type="text"
                  name="telephone"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="localIdLabel" for="tracker-entity-instance-localId">
                  Local Id
                </Label>
                <AvField
                  id="tracker-entity-instance-localId"
                  type="text"
                  name="localId"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="codeLabel" for="tracker-entity-instance-code">
                  Code
                </Label>
                <AvField id="tracker-entity-instance-code" type="string" className="form-control" name="code" />
              </AvGroup>
              <AvGroup>
                <Label id="certificateLabel" for="tracker-entity-instance-certificate">
                  Certificate
                </Label>
                <AvField id="tracker-entity-instance-certificate" type="text" name="certificate" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/tracker-entity-instance" replace color="info">
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
  trackerEntityInstanceEntity: storeState.trackerEntityInstance.entity,
  loading: storeState.trackerEntityInstance.loading,
  updating: storeState.trackerEntityInstance.updating,
  updateSuccess: storeState.trackerEntityInstance.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TrackerEntityInstanceUpdate);
