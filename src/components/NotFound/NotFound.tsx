import * as React from 'react';
import { Link } from 'react-router-dom';

export default class NotFound extends React.Component {
	public render() {
  		return (
			<div className='container'>
  				<h1 className='title'>Oops, page not found...</h1>
  				<p className='center'>Click <Link to='/'>here</Link> to go back to the home page.</p>
			</div>
		);
	}
}
