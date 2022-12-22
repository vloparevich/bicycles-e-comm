import React from 'react';
import spinner from './../../Assets/loading-icon.gif';

function Spinner() {
  return (
    <div
      className='spinner'
      style={{ display: 'flex', justifyContent: 'center' }}
    >
      <img style={{ width: '100px' }} src={spinner} alt='Loading...' />
    </div>
  );
}

export default Spinner;
