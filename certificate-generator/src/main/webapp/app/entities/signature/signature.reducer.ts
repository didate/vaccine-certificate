import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ISignature, defaultValue } from 'app/shared/model/signature.model';

export const ACTION_TYPES = {
  FETCH_SIGNATURE_LIST: 'signature/FETCH_SIGNATURE_LIST',
  FETCH_SIGNATURE: 'signature/FETCH_SIGNATURE',
  CREATE_SIGNATURE: 'signature/CREATE_SIGNATURE',
  UPDATE_SIGNATURE: 'signature/UPDATE_SIGNATURE',
  DELETE_SIGNATURE: 'signature/DELETE_SIGNATURE',
  SET_BLOB: 'signature/SET_BLOB',
  RESET: 'signature/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ISignature>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type SignatureState = Readonly<typeof initialState>;

// Reducer

export default (state: SignatureState = initialState, action): SignatureState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_SIGNATURE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_SIGNATURE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_SIGNATURE):
    case REQUEST(ACTION_TYPES.UPDATE_SIGNATURE):
    case REQUEST(ACTION_TYPES.DELETE_SIGNATURE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_SIGNATURE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_SIGNATURE):
    case FAILURE(ACTION_TYPES.CREATE_SIGNATURE):
    case FAILURE(ACTION_TYPES.UPDATE_SIGNATURE):
    case FAILURE(ACTION_TYPES.DELETE_SIGNATURE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_SIGNATURE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_SIGNATURE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_SIGNATURE):
    case SUCCESS(ACTION_TYPES.UPDATE_SIGNATURE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_SIGNATURE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.SET_BLOB: {
      const { name, data, contentType } = action.payload;
      return {
        ...state,
        entity: {
          ...state.entity,
          [name]: data,
          [name + 'ContentType']: contentType,
        },
      };
    }
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/signatures';

// Actions

export const getEntities: ICrudGetAllAction<ISignature> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_SIGNATURE_LIST,
    payload: axios.get<ISignature>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<ISignature> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_SIGNATURE,
    payload: axios.get<ISignature>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<ISignature> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_SIGNATURE,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ISignature> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_SIGNATURE,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ISignature> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_SIGNATURE,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const setBlob = (name, data, contentType?) => ({
  type: ACTION_TYPES.SET_BLOB,
  payload: {
    name,
    data,
    contentType,
  },
});

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
