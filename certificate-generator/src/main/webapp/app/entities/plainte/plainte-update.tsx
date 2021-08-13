import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './plainte.reducer';
import { IPlainte } from 'app/shared/model/plainte.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPlainteUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PlainteUpdate = (props: IPlainteUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { plainteEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/plainte' + props.location.search);
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
        ...plainteEntity,
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
          <h2 id="certificateGeneratorApp.plainte.home.createOrEditLabel">Create or edit a Plainte</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : plainteEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="plainte-id">ID</Label>
                  <AvInput id="plainte-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="telephoneLabel" for="plainte-telephone">
                  Telephone
                </Label>
                <AvField id="plainte-telephone" type="text" name="telephone" />
              </AvGroup>
              <AvGroup>
                <Label id="localIdLabel" for="plainte-localId">
                  Local Id
                </Label>
                <AvField id="plainte-localId" type="text" name="localId" />
              </AvGroup>
              <AvGroup>
                <Label id="codeLabel" for="plainte-code">
                  Code
                </Label>
                <AvField id="plainte-code" type="string" className="form-control" name="code" />
              </AvGroup>
              <AvGroup>
                <Label id="commentaireLabel" for="plainte-commentaire">
                  Commentaire
                </Label>
                <AvField
                  id="plainte-commentaire"
                  type="text"
                  name="commentaire"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' },
                  }}
                />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/plainte" replace color="info">
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
  plainteEntity: storeState.plainte.entity,
  loading: storeState.plainte.loading,
  updating: storeState.plainte.updating,
  updateSuccess: storeState.plainte.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PlainteUpdate);
