import React from 'react';
import './Loader.css';

export default function Loader() {
  return (
    <div className="spinner-container">
      <div className="loading-spinner">
        <img src="http://localhost:3000/img/spinner.gif" alt="loading-spinner"/>
      </div>
    </div>
  );
}
