import React, { Component } from 'react';
import * as api from '../services/api';
import { fetchImageGallery } from '../services/api';
import { Searchbar } from './searchbar/searchbar';
import { ImageGallery } from './imageGallery/imageGallery';
import { Modal } from './modal/modal';
import { Loader } from './loader/loader';

export class App extends Component {
  state = {
    pictures: null,
    isLoading: false,
    error: null,
    showModal: false,
    currentImageInModal: '',
  };

  fetchGallery = searchTerm => {
    this.setState({ isLoading: true });
    fetchImageGallery(searchTerm).then(res => {
      try {
        const normalizedImages = api.normalizedImages(res.hits);
        this.setState({
          pictures: normalizedImages,
        });
      } catch (error) {
        this.setState({ error: 'Something went wrong!' });
      } finally {
        this.setState({ isLoading: false });
      }
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
        {this.state.isLoading && <Loader />}
        <ImageGallery
          dataPictures={this.state.pictures}
          // loader={this.state.isLoading}
          changeShowModal={this.changeShowModal}
        />
        <Modal
          showModal={this.state.showModal}
          longUrl={this.state.currentImageInModal}
          toggleModal={this.changeShowModal}
        />
      </>
    );
  }
}
