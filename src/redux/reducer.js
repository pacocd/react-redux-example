import Immutable from 'immutable';
import * as types from './types';

export default function reducer(state = Immutable.Map(), action) {
  switch (action.type) {
    case types.LOAD_CHARACTERS:
      return { ...state, characters: action.payload };
    case types.POPULATE_CHARACTERS: {
      return {
        ...state,
        characters: action.characters,
        pages: action.pages,
        count: action.count
      };
    }
    default:
      return state;
  }
}
