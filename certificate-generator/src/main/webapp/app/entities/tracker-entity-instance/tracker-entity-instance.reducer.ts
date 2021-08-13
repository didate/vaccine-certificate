import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ITrackerEntityInstance, defaultValue } from 'app/shared/model/tracker-entity-instance.model';
import { IEvent } from 'app/shared/model/event.model';

export const ACTION_TYPES = {
  FETCH_TRACKERENTITYINSTANCE_LIST: 'trackerEntityInstance/FETCH_TRACKERENTITYINSTANCE_LIST',
  FETCH_EVENT_LIST: 'trackerEntityInstance/FETCH_EVENT_LIST',
  FETCH_TRACKERENTITYINSTANCE: 'trackerEntityInstance/FETCH_TRACKERENTITYINSTANCE',
  CREATE_TRACKERENTITYINSTANCE: 'trackerEntityInstance/CREATE_TRACKERENTITYINSTANCE',
  UPDATE_TRACKERENTITYINSTANCE: 'trackerEntityInstance/UPDATE_TRACKERENTITYINSTANCE',
  DELETE_TRACKERENTITYINSTANCE: 'trackerEntityInstance/DELETE_TRACKERENTITYINSTANCE',
  RESET: 'trackerEntityInstance/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ITrackerEntityInstance>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type TrackerEntityInstanceState = Readonly<typeof initialState>;

// Reducer

export default (state: TrackerEntityInstanceState = initialState, action): TrackerEntityInstanceState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_TRACKERENTITYINSTANCE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_TRACKERENTITYINSTANCE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_TRACKERENTITYINSTANCE):
    case REQUEST(ACTION_TYPES.UPDATE_TRACKERENTITYINSTANCE):
    case REQUEST(ACTION_TYPES.DELETE_TRACKERENTITYINSTANCE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_TRACKERENTITYINSTANCE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_TRACKERENTITYINSTANCE):
    case FAILURE(ACTION_TYPES.CREATE_TRACKERENTITYINSTANCE):
    case FAILURE(ACTION_TYPES.UPDATE_TRACKERENTITYINSTANCE):
    case FAILURE(ACTION_TYPES.DELETE_TRACKERENTITYINSTANCE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_TRACKERENTITYINSTANCE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_TRACKERENTITYINSTANCE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_TRACKERENTITYINSTANCE):
    case SUCCESS(ACTION_TYPES.UPDATE_TRACKERENTITYINSTANCE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_TRACKERENTITYINSTANCE):
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

const apiUrl = 'api/tracker-entity-instances';

// Actions

export const getEntities: ICrudGetAllAction<ITrackerEntityInstance> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_TRACKERENTITYINSTANCE_LIST,
    payload: axios.get<ITrackerEntityInstance>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEvents : ICrudGetAllAction<IEvent> = id =>{
  const requestUrl =`${apiUrl}/${id}/events`
  return {
    type : ACTION_TYPES.FETCH_TRACKERENTITYINSTANCE_LIST,
    payload: axios.get<IEvent>(requestUrl),
  }
}

export const getEntity: ICrudGetAction<ITrackerEntityInstance> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_TRACKERENTITYINSTANCE,
    payload: axios.get<ITrackerEntityInstance>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<ITrackerEntityInstance> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_TRACKERENTITYINSTANCE,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ITrackerEntityInstance> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_TRACKERENTITYINSTANCE,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ITrackerEntityInstance> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_TRACKERENTITYINSTANCE,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
