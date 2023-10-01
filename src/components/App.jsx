import React, { Component } from 'react';
import { fetchImageGallery } from '../services/api';
import { Searchbar } from './searchbar/searchbar';
import { ImageGallery } from './imageGallery/imageGallery';
import { Modal } from './modal/modal';

export class App extends Component {
  state = {
    pictures: null,
    isLoading: false,
    error: null,
    showModal: false,
    currentImageInModal: '',
  };

  fetchGallery = searchTerm => {
    fetchImageGallery(searchTerm).then(res => {
      this.setState({ pictures: res.hits });
    });
  };

  changeShowModal = (newState, imgUrl) => {
    this.setState({
      showModal: newState,
      currentImageInModal: imgUrl,
    });
  };

  render() {
    return (
      <>
        <Searchbar getGallery={this.fetchGallery} />
        <ImageGallery
          dataPictures={this.state.pictures}
          loader={this.state.isLoading}
          changeShowModal={this.changeShowModal}
        />
        <Modal
          isShowing={this.state.showModal}
          longUrl={this.state.currentImageInModal}
        />
      </>
    );
  }
}
