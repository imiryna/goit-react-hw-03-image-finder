import React, { Component } from 'react';
import { Overlay, ModalWindow } from './modal.styled';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.toggleModal(false, '');
    }
  };

  handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.toggleModal(false, '');
    }
  };

  render() {
    if (!this.props.showModal) {
      return null;
    }
    return (
      <Overlay onClick={this.handleBackdropClick}>
        <ModalWindow>
          <img
            src={this.props.longUrl}
            alt={this.props.tags}
            width="800"
            height="600"
          />
        </ModalWindow>
      </Overlay>
    );
  }
}
