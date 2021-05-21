import React from 'react';
import './Loader.css';

export default function Loader() {
  return (
    <div>
      <div className="Spinner Flex J-C-C A-I-C">
        <img src="http://localhost:3000/img/spinner.gif" alt="loading-spinner"/>
      </div>
    </div>
  );
}
