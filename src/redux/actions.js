import * as types from './types';
import axios from 'axios';

export const loadCharacters = () => {
  return {
    type: types.LOAD_CHARACTERS,
    payload: [
      { id: 1, name: 'Rick' },
      { id: 2, name: 'Morthy' },
      { id: 3, name: 'No One' }
    ]
  };
};

export const loadCharactersFromAPI = (page = 1) => {
  return dispatch => {
    axios
      .get(`https://rickandmortyapi.com/api/character?page=${page}`)
      .then(function(response) {
        const characters = response.data.results;
        const pages = response.data.info.pages;
        const count = response.data.info.count;

        dispatch(populateCharacters(characters, count, pages));
      });
  };
};

function populateCharacters(characters, count, pages) {
  return {
    type: types.POPULATE_CHARACTERS,
    characters,
    count,
    pages
  };
}
