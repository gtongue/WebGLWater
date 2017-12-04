import React from 'react';
import App from './app';

export default class Root extends React.Component {
  constructor(props){
    super(props);
  }
  render()
  {
    return (
      <App />
    );
  }
}