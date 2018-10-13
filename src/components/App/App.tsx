import * as React from 'react';
import 'babel-polyfill'; // prevents broken page in older IEs

import Main from 'components/Main/Main';
import Navbar from 'components/Navbar/Navbar';
import Footer from 'components/Footer/Footer';

import './App.sass';

export default class App extends React.Component<{}, {}>  {

  public render() {
    return (
      <div className='app'>
        <Navbar />
        <Main />
        <Footer />
      </div>
    );
  }
}
