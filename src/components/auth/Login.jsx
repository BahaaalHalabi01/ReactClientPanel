import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loginClient } from '../../store/actions/authActions'
import { clearNotify } from '../../store/actions/notifyActions'
import Alert from '../common/Alert'
import { isEmpty } from 'react-redux-firebase'

const Login = props => {
	const [state, setState] = useState({ email: '', password: '' })

	const auth = useSelector(state => state.firebase.auth)
	const login = useDispatch(loginClient)
	const clear = useDispatch(clearNotify)
	const notify = useSelector(state => state.notify)

	const { history } = props

	//if trying to access login while already logged in
	useEffect(() => {
		if (!isEmpty(auth)) history.push('/')
	}, [auth, history])


    //cleanup the component when going back to Clients to not preserve this client for a second entry
	useEffect(() => {
		clear(clearNotify())
	}, [history,clear])


	const handleSubmit = event => {
		event.preventDefault()
		login(loginClient(state, history))
	}

	const handleChange = event => {
		setState({ ...state, [event.target.name]: event.target.value })
	}

	return (
		<div className='row'>
			<div className='col-md-6 mx-auto'>
				<div className='card'>
					<div className='card-body'>
						{notify.message === null ? null : <Alert message={notify.message} messageType={notify.messageType} />}
						<h1 className='text-center pb-2 pt-2'>
							<span className='text-primary'>
								<i className='fas fa-lock'></i> Login
							</span>
						</h1>
						<form onSubmit={handleSubmit}>
							<div className='form-group'>
								<label htmlFor='email'>Email</label>
								<input type='text' className='form-control' name='email' value={state.email} onChange={handleChange} required />
							</div>
							<div className='form-group'>
								<label htmlFor='password'>Password</label>
								<input type='password' className='form-control' name='password' value={state.password} onChange={handleChange} required />
							</div>
							<div className='d-flex justify-content-center'>
								<input type='submit' value='Login' className='btn btn-primary btn-lg mt-2 ' />
							</div>
						</form>
					</div>
				</div>
			</div>

			<form onSubmit={handleSubmit}></form>
		</div>
	)
}

export default Login
