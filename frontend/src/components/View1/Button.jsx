import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Button = ({ icon, onClick, style }) => {
  return (
    <button onClick={onClick} style={style}>
      <FontAwesomeIcon icon={icon} />
    </button>
  );
};

export default Button;
