import React, { Component } from 'react';
import Notiflix from 'notiflix';
import {
  SearchFormCss,
  SearchInputCss,
  SearchButtonCss,
  HeaderCss,
} from './searchbar.styled';

export class Searchbar extends Component {
  state = {
    inputValue: '',
  };

  getGalleryPictures = e => {
    this.setState({ inputValue: e.target.value });
  };

  handleClick = () => {
    this.props.getGallery(this.state.inputValue);
    if (this.state.inputValue === '') {
      Notiflix.Notify.info(
        'The search bar cannot be empty. Please type any criteria in the search bar.'
      );
    }
  };

  render() {
    return (
      <HeaderCss>
        <SearchFormCss>
          <SearchButtonCss type="button" onClick={this.handleClick}>
            <span>Search</span>
          </SearchButtonCss>

          <SearchInputCss
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.getGalleryPictures}
          />
        </SearchFormCss>
      </HeaderCss>
    );
  }
}
