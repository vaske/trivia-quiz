
import * as React from 'react';
import './Footer.sass';

const Footer: React.SFC<{}> = () => {
  	return (
        <footer className='footer white'>
            <div className='content has-text-centered'>
                &copy; 2018 Milan Vasic
            </div>
        </footer>
    );
};

export default Footer;
