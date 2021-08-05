import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './tracker-entity-instance.reducer';
import { ITrackerEntityInstance } from 'app/shared/model/tracker-entity-instance.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITrackerEntityInstanceDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const TrackerEntityInstanceDetail = (props: ITrackerEntityInstanceDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { trackerEntityInstanceEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          TrackerEntityInstance [<b>{trackerEntityInstanceEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="uid">Uid</span>
          </dt>
          <dd>{trackerEntityInstanceEntity.uid}</dd>
          <dt>
            <span id="nom">Nom</span>
          </dt>
          <dd>{trackerEntityInstanceEntity.nom}</dd>
          <dt>
            <span id="prenom">Prenom</span>
          </dt>
          <dd>{trackerEntityInstanceEntity.prenom}</dd>
          <dt>
            <span id="sexe">Sexe</span>
          </dt>
          <dd>{trackerEntityInstanceEntity.sexe}</dd>
          <dt>
            <span id="profession">Profession</span>
          </dt>
          <dd>{trackerEntityInstanceEntity.profession}</dd>
          <dt>
            <span id="age">Age</span>
          </dt>
          <dd>{trackerEntityInstanceEntity.age}</dd>
          <dt>
            <span id="prefecture">Prefecture</span>
          </dt>
          <dd>{trackerEntityInstanceEntity.prefecture}</dd>
          <dt>
            <span id="sousPrefecture">Sous Prefecture</span>
          </dt>
          <dd>{trackerEntityInstanceEntity.sousPrefecture}</dd>
          <dt>
            <span id="quartier">Quartier</span>
          </dt>
          <dd>{trackerEntityInstanceEntity.quartier}</dd>
          <dt>
            <span id="village">Village</span>
          </dt>
          <dd>{trackerEntityInstanceEntity.village}</dd>
          <dt>
            <span id="telephone">Telephone</span>
          </dt>
          <dd>{trackerEntityInstanceEntity.telephone}</dd>
          <dt>
            <span id="localId">Local Id</span>
          </dt>
          <dd>{trackerEntityInstanceEntity.localId}</dd>
          <dt>
            <span id="code">Code</span>
          </dt>
          <dd>{trackerEntityInstanceEntity.code}</dd>
          <dt>
            <span id="certificate">Certificate</span>
          </dt>
          <dd>{trackerEntityInstanceEntity.certificate}</dd>
        </dl>
        <Button tag={Link} to="/tracker-entity-instance" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/tracker-entity-instance/${trackerEntityInstanceEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ trackerEntityInstance }: IRootState) => ({
  trackerEntityInstanceEntity: trackerEntityInstance.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TrackerEntityInstanceDetail);
