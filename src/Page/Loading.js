import React from 'react';
import './stylesheet/loading.css';
function Loading() {
  return (
    <div className='loading'>
      <div className='loading__loader-outer'>
        <div className='loading__loader-inner'>
          <i className='fa fa-ellipsis-h' aria-hidden='true'></i>
        </div>
      </div>
      <h1 className='loading__h1'>
        <span className='loading__span'></span>
      </h1>
    </div>
  );
}

export default Loading;
