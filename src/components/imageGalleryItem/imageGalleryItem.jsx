import React, { Component } from 'react';
import { ItemCss, ImgCss } from './imageGalleryItem.styled';
// import { Modal } from 'components/modal/modal';

export class ImageGalleryItem extends Component {
  openModal = () => {
    this.props.changeShowModal(true, this.props.image.largeImageURL);
  };

  render() {
    return (
      <>
        <ItemCss id={this.props.id}>
          <ImgCss
            src={this.props.image.webformatURL}
            alt={this.props.image.tags}
            onClick={this.openModal}
          />
        </ItemCss>
      </>
    );
  }
}
