import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IGeneration, defaultValue } from 'app/shared/model/generation.model';

export const ACTION_TYPES = {
  FETCH_GENERATION_LIST: 'generation/FETCH_GENERATION_LIST',
  FETCH_GENERATION: 'generation/FETCH_GENERATION',
  CREATE_GENERATION: 'generation/CREATE_GENERATION',
  UPDATE_GENERATION: 'generation/UPDATE_GENERATION',
  DELETE_GENERATION: 'generation/DELETE_GENERATION',
  RESET: 'generation/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IGeneration>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type GenerationState = Readonly<typeof initialState>;

// Reducer

export default (state: GenerationState = initialState, action): GenerationState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_GENERATION_LIST):
    case REQUEST(ACTION_TYPES.FETCH_GENERATION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_GENERATION):
    case REQUEST(ACTION_TYPES.UPDATE_GENERATION):
    case REQUEST(ACTION_TYPES.DELETE_GENERATION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_GENERATION_LIST):
    case FAILURE(ACTION_TYPES.FETCH_GENERATION):
    case FAILURE(ACTION_TYPES.CREATE_GENERATION):
    case FAILURE(ACTION_TYPES.UPDATE_GENERATION):
    case FAILURE(ACTION_TYPES.DELETE_GENERATION):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_GENERATION_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_GENERATION):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_GENERATION):
    case SUCCESS(ACTION_TYPES.UPDATE_GENERATION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_GENERATION):
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

const apiUrl = 'api/generations';

// Actions

export const getEntities: ICrudGetAllAction<IGeneration> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_GENERATION_LIST,
    payload: axios.get<IGeneration>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<IGeneration> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_GENERATION,
    payload: axios.get<IGeneration>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IGeneration> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_GENERATION,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IGeneration> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_GENERATION,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IGeneration> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_GENERATION,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
