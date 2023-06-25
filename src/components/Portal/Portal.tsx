import React from 'react';
import ReactDOM from 'react-dom';

function Portal({ children }: any) {
  return ReactDOM.createPortal(children, document.querySelector('#root')!);
}

export default Portal;
