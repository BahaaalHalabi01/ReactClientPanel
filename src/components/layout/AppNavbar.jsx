import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/actions/authActions'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { isEmpty } from 'react-redux-firebase'

export const AppNavbar = () => {
	const action = useDispatch(logout())
	const auth = useSelector(state => state.firebase.auth)
	const settings = useSelector(state => state.settings)

	let authLinks = null

	isEmpty(auth)
		? (authLinks = (
				<ul className='navbar-nav ml-auto'>
					<li className='nav-item'>
						<Link to='/login' className='nav-link'>
							Login
						</Link>
					</li>
					{settings.setAllowRegistration ? (
						<li className='nav-item'>
							<Link to='/register' className='nav-link'>Register</Link>
						</li>
					) : null}
				</ul>
		  ))
		: (authLinks = (
				<ul className='navbar-nav ml-auto'>
					<li className='nav-item'>
						<a className='nav-link' href='#!'>
							{auth.email}
						</a>
					</li>
					<li className='nav-item'>
						<Link to='/settings' className='nav-link'>
							Settings
						</Link>
					</li>
					<li className='nav-item'>
						<a href='#!' className='nav-link' onClick={() => action(logout())}>
							Logout User
						</a>
					</li>
				</ul>
		  ))

	return (
		<nav className='navbar navbar-expand-md mb-2 navbar-dark bg-primary'>
			<div className='container-fluid'>
				<Link to='/' className='navbar-brand'>
					ClientPanel
				</Link>
				<button
					className='navbar-toggler'
					type='button'
					data-bs-toggle='collapse'
					data-bs-target='#navbarMain'
					aria-controls='navbarMain'
					aria-expanded='false'
					aria-label='Toggle navigation'>
					<span className='navbar-toggler-icon'></span>
				</button>
				<div className='collapse navbar-collapse d-flex justify-content-end' id='navbarMain'>
					{authLinks}
				</div>
			</div>
		</nav>
	)
}

export default AppNavbar
