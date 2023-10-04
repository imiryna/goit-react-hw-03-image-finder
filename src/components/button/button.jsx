import React from 'react';
import PropTypes from 'prop-types';
import { LoadButton } from './button.styled';

export const Button = props => {
  return (
    <div>
      <LoadButton type="button" onClick={props.onClick}>
        Load more
      </LoadButton>
    </div>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
