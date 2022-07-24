import { useState } from 'react';
import s from './index.module.css';
import { MdOutlineImageSearch } from 'react-icons/md';
import Notiflix from 'notiflix';
import PropTypes from 'prop-types';

function Searchbar({onSubmit}) {
  const [searchValue, setSearchValue] = useState('');

  const hendelInputValue = event => {
    setSearchValue(event.target.value.toLowerCase());
  };

  const hendelSubmit = e => {
    e.preventDefault();
    if (searchValue.trim() === '') {
      Notiflix.Notify.warning('Please specify your query!');
      return;
    }
    onSubmit(searchValue);

    setSearchValue('');
  };

  return (
    <header className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={hendelSubmit}>
        <button type="submit" className={s.SearchForm_button}>
          <MdOutlineImageSearch style={{ width: 30, height: 30 }} />
        </button>

        <input
          className={s.SearchForm_input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="searchValue"
          value={searchValue}
          onChange={hendelInputValue}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
