import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPlainte, defaultValue } from 'app/shared/model/plainte.model';

export const ACTION_TYPES = {
  FETCH_PLAINTE_LIST: 'plainte/FETCH_PLAINTE_LIST',
  FETCH_PLAINTE: 'plainte/FETCH_PLAINTE',
  CREATE_PLAINTE: 'plainte/CREATE_PLAINTE',
  UPDATE_PLAINTE: 'plainte/UPDATE_PLAINTE',
  DELETE_PLAINTE: 'plainte/DELETE_PLAINTE',
  RESET: 'plainte/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPlainte>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type PlainteState = Readonly<typeof initialState>;

// Reducer

export default (state: PlainteState = initialState, action): PlainteState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PLAINTE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PLAINTE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_PLAINTE):
    case REQUEST(ACTION_TYPES.UPDATE_PLAINTE):
    case REQUEST(ACTION_TYPES.DELETE_PLAINTE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_PLAINTE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PLAINTE):
    case FAILURE(ACTION_TYPES.CREATE_PLAINTE):
    case FAILURE(ACTION_TYPES.UPDATE_PLAINTE):
    case FAILURE(ACTION_TYPES.DELETE_PLAINTE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_PLAINTE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_PLAINTE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_PLAINTE):
    case SUCCESS(ACTION_TYPES.UPDATE_PLAINTE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_PLAINTE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/plaintes';

// Actions

export const getEntities: ICrudGetAllAction<IPlainte> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_PLAINTE_LIST,
    payload: axios.get<IPlainte>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<IPlainte> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PLAINTE,
    payload: axios.get<IPlainte>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IPlainte> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PLAINTE,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPlainte> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PLAINTE,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPlainte> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PLAINTE,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
