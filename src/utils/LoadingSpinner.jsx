import React from 'react';

const LoadingSpinner = () => (
  <div className="alertPersonal warning d-flex justify-content-center">
    <div className="spinner-border text-warning" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

export default LoadingSpinner;
