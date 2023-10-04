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
  };

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
        const normalizedImages = api.normalizedImages(res.hits);
        this.setState(prevState => ({
          pictures: [...prevState.pictures, ...normalizedImages],
          page: this.isLastPage(res.totalHits)
            ? prevState.page
            : prevState.page + 1,
          searchTerm: searchTerm,
        }));
      } catch (error) {
        this.setState({ error: 'Something went wrong!' });
      } finally {
        this.setState({ isLoading: false });
      }
    });
  };

  isLastPage = totalImg => {
    const totalPage = Math.ceil(totalImg / 12);
    return this.state.page === totalPage;
  };

  changeShowModal = (newState, imgUrl) => {
    this.setState({
      showModal: newState,
      currentImageInModal: imgUrl,
    });
  };

  loadMore = () => {
    this.fetchImageByPage(this.state.searchTerm, this.state.page);
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
        {this.isLastPage() || !this.state.searchTerm ? null : (
          <Button onClick={this.loadMore} />
        )}
      </>
    );
  }
}
