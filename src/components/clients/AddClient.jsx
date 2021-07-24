import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { addClient } from '../../store/actions/clientActions'
import { useDispatch, useSelector } from 'react-redux'

const AddClient = props => {
	const [state, setState] = useState({ firstName: '', lastName: '', email: '', phoneNumber: '', balance: '' })
	// const [errors, setErrors] = useState({})
	const errors = {}
	const { history } = props

	const dispatch = useDispatch(addClient)
	const settings = useSelector(state => state.settings)

	const handleSubmit = event => {
		event.preventDefault()
		const newClient = state
		if (newClient.balance === '') newClient.balance = 0

		dispatch(addClient(newClient, history))
	}

	const handleChange = event => {
		setState({ ...state, [event.target.name]: event.target.value })
	}
	return (
		<div>
			<div className='row'>
				<div className='col-md-6'>
					<Link to='/' className='btn btn-link text-decoration-none'>
						<i className='fas fa-arrow-circle-left' /> Back To Dashboard
					</Link>
				</div>
			</div>
			<div className='row justify-content-md-center'>
				<div className='col-md-8 '>
					<div className='card'>
						<div className='card-header'>Add Client</div>
						<div className='card-body'>
							<form onSubmit={handleSubmit}>
								<div className='form-group'>
									<label htmlFor='firstName' className='form-label'>
										First Name
									</label>
									<input
										type='text'
										className={classNames('form-control', { 'is-invalid': errors.firstName })}
										name='firstName'
										value={state.firstName}
										onChange={handleChange}
									/>
								</div>
								<div className='form-group'>
									<label htmlFor='lastName' className='form-label'>
										Last Name
									</label>
									<input
										type='text'
										className={classNames('form-control', { 'is-invalid': errors.lastName })}
										name='lastName'
										value={state.lastName}
										onChange={handleChange}
									/>
								</div>
								<div className='form-group'>
									<label htmlFor='email' className='form-label'>
										Email
									</label>
									<input
										type='text'
										className={classNames('form-control', { 'is-invalid': errors.email })}
										name='email'
										value={state.email}
										onChange={handleChange}
									/>
								</div>
								<div className='form-group'>
									<label htmlFor='firstName' className='form-label'>
										Phone Number
									</label>
									<input
										type='text'
										className={classNames('form-control', { 'is-invalid': errors.phoneNumber })}
										name='phoneNumber'
										value={state.phoneNumber}
										onChange={handleChange}
									/>
								</div>
								<div className='form-group'>
									<label htmlFor='balance' className='form-label'>
										Balance
									</label>
									<input
										disabled={settings.disableBalanceOnAdd}
										type='text'
										className={classNames('form-control', { 'is-invalid': errors.balance })}
										name='balance'
										value={state.balance}
										onChange={handleChange}
									/>
								</div>
								<button type='submit' className='btn btn-primary mt-3'>
									Submit
								</button>
							</form>
						</div>
					</div>{' '}
				</div>
			</div>
		</div>
	)
}

export default AddClient
