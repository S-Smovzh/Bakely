import React from 'react';
import './SearchBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

export const SearchBar = () => {
  return (
    <div className={'Search'}>
      <button type={'button'} className={'Search-Button'}>
        <FontAwesomeIcon icon={faSearch} />
      </button>

      <input type={'search'} className={'Search-Input'}/>
    </div>
  );
};
