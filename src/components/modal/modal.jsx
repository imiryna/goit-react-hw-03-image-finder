import React, { Component } from 'react';
import { Overlay, ModalWindow } from './modal.styled';

export class Modal extends Component {
  state = {
    show: false,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  render() {
    if (!this.props.isShowing) {
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
