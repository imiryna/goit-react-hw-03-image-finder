import React, { Component } from 'react';
import * as api from '../services/api';
import { fetchImageGallery } from '../services/api';
import { Searchbar } from './searchbar/searchbar';
import { ImageGallery } from './imageGallery/imageGallery';
import { Modal } from './modal/modal';
import { Loader } from './loader/loader';
import { Button } from './button/button';

export class App extends Component {
  state = {
    pictures: [],
    isLoading: false,
    error: null,
    showModal: false,
    currentImageInModal: '',
    page: 1,
    searchTerm: '',
    total: 0,
  };

  componentDidUpdate(_, prevState) {
    if (prevState.page !== this.state.page) {
      this.fetchImageByPage(this.state.searchTerm, this.state.page);
    }
  }

  fetchGallery = searchTerm => {
    this.setState({
      isLoading: true,
      pictures: [],
      page: 1,
    });
    this.fetchImageByPage(searchTerm, this.state.page);
  };

  fetchImageByPage = (searchTerm, page) => {
    fetchImageGallery(searchTerm, page).then(res => {
      try {
        console.log(`res pages: ${page}`);
        console.log(res);
        const normalizedImages = api.normalizedImages(res.hits);
        this.setState(prevState => ({
          pictures: [...prevState.pictures, ...normalizedImages],
          searchTerm: searchTerm,
          total: res.totalHits,
        }));
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

  loadMore = () => {
    this.setState(({ page }) => ({
      page: page + 1,
    }));
  };

  render() {
    return (
      <>
        <Searchbar getGallery={this.fetchGallery} />
        {this.state.isLoading && <Loader />}
        {this.state.pictures.length > 0 ? (
          <ImageGallery
            dataPictures={this.state.pictures}
            // loader={this.state.isLoading}
            changeShowModal={this.changeShowModal}
          />
        ) : (
          <p
            style={{
              padding: 100,
              textAlign: 'center',
              fontSize: 24,
              color: 'grey',
            }}
          >
            Image gallery is empty...
          </p>
        )}
        <Modal
          showModal={this.state.showModal}
          longUrl={this.state.currentImageInModal}
          toggleModal={this.changeShowModal}
        />
        {this.state.pictures.length === 0 ||
        this.state.pictures.length === this.state.total ? null : (
          <Button onClick={this.loadMore} />
        )}
      </>
    );
  }
}
