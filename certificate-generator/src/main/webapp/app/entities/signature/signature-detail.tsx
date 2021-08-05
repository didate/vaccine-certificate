import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './signature.reducer';
import { ISignature } from 'app/shared/model/signature.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ISignatureDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const SignatureDetail = (props: ISignatureDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { signatureEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          Signature [<b>{signatureEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="authorite">Authorite</span>
          </dt>
          <dd>{signatureEntity.authorite}</dd>
          <dt>
            <span id="signature">Signature</span>
          </dt>
          <dd>
            {signatureEntity.signature ? (
              <div>
                {signatureEntity.signatureContentType ? (
                  <a onClick={openFile(signatureEntity.signatureContentType, signatureEntity.signature)}>
                    <img
                      src={`data:${signatureEntity.signatureContentType};base64,${signatureEntity.signature}`}
                      style={{ maxHeight: '30px' }}
                    />
                  </a>
                ) : null}
                <span>
                  {signatureEntity.signatureContentType}, {byteSize(signatureEntity.signature)}
                </span>
              </div>
            ) : null}
          </dd>
        </dl>
        <Button tag={Link} to="/signature" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/signature/${signatureEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ signature }: IRootState) => ({
  signatureEntity: signature.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SignatureDetail);
