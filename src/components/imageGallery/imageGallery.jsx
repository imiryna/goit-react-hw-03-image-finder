import React, { Component } from 'react';
import { GalleryListCss } from './imageGallery.styled';
import { ImageGalleryItem } from '../imageGalleryItem/imageGalleryItem';

export class ImageGallery extends Component {
  render() {
    const showImage =
      Array.isArray(this.props.dataPictures) && this.props.dataPictures.length;
    return (
      <GalleryListCss>
        {showImage &&
          this.props.dataPictures.map(picture => (
            <ImageGalleryItem
              key={picture.id}
              image={picture}
              changeShowModal={this.props.changeShowModal}
            />
          ))}
      </GalleryListCss>
    );
  }
}
