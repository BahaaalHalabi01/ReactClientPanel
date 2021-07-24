import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { registerClient } from '../../store/actions/authActions'
import { clearNotify } from '../../store/actions/notifyActions'
import Alert from '../common/Alert'
import { isEmpty } from 'react-redux-firebase'

const Register = props => {
	const [state, setState] = useState({ email: '', password: '', confirmPassword: '' })

	//redux data
	const auth = useSelector(state => state.firebase.auth)
	const notify = useSelector(state => state.notify)
	const settings = useSelector(state => state.settings)
	//actions
	const register = useDispatch(registerClient)
	const clear = useDispatch(clearNotify)

	const { history } = props

	useEffect(() => {}, [settings, history])

	//if trying to access register while already logged in or allow registration is disabled
	useEffect(() => {
		if (!settings.setAllowRegistration) {
			window.alert('Registration is Disabled')
			history.push('/login')
			return
		}

		if (!isEmpty(auth)) {
			history.push('/')
			window.alert("Can't Register while already logged in")
			return
		}
	}, [auth, history, settings])

	//cleanup the component when going back to Clients to not preserve this client for a second entry
	useEffect(() => {
		clear(clearNotify())
	}, [history, clear])

	const handleSubmit = event => {
		event.preventDefault()
		register(registerClient({ email: state.email, password: state.password }))
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
								<i className='fas fa-lock'></i> Register
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
							<div className='form-group'>
								<label htmlFor='confirmPassword'>Confirm Password</label>
								<input
									type='password'
									className='form-control'
									name='confirmPassword'
									value={state.confirmPassword}
									onChange={handleChange}
									required
								/>
							</div>
							<div className='d-flex justify-content-center'>
								<input type='submit' value='Register' className='btn btn-primary btn-lg mt-2 ' />
							</div>
						</form>
					</div>
				</div>
			</div>

			<form onSubmit={handleSubmit}></form>
		</div>
	)
}

export default Register
