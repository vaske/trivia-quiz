import * as React from 'react';
import './Navbar.sass';

const Navbar: React.SFC<{}> = () => {
  	return (
        <nav className='navbar navbar-trivia' role='navigation' aria-label='main navigation'>
            <div className='navbar-brand'>
                Trivia Challenge 2018
            </div>
        </nav>
    );
};

export default Navbar;
