import React, { Component } from 'react';
import s from './index.module.css';
import { MdOutlineImageSearch } from 'react-icons/md';
import Notiflix from 'notiflix';
import PropTypes from 'prop-types';

class Searchbar extends Component {
  state = {
    searchValue: '',
  };

  hendelInputValue = event => {
    this.setState({ searchValue: event.target.value.toLowerCase() });
  };

  hendelSubmit = e => {
    e.preventDefault();
    if (this.state.searchValue.trim() === '') {
      Notiflix.Notify.warning('Please specify your query!');
      return;
    }
    this.props.onSubmit(this.state.searchValue);

    this.setState({ searchValue: '' });
  };

  render() {
    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={this.hendelSubmit}>
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
            value={this.state.searchValue}
            onChange={this.hendelInputValue}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
