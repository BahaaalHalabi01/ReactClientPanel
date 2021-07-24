import React, { useState, useEffect } from 'react'

import { useFirestoreConnect, isEmpty, isLoaded } from 'react-redux-firebase'
import { Link } from 'react-router-dom'
import { useDispatch,useSelector  } from 'react-redux'
import Spinner from '../common/Spinner'
import classNames from 'classnames'
import { editClient } from '../../store/actions/clientActions'

const EditClient = props => {
	useFirestoreConnect({ collection: 'clients', storeAs: 'client', doc: props.match.params.clientId })
	const [state, setState] = useState({ firstName: '', lastName: '', email: '', phoneNumber: '', balance: '' })
	const errors = {}
	const { history } = props
	const edit = useDispatch(editClient)

	const data = useSelector(state => state.firestore.ordered.client && state.firestore.ordered.client[0])
	const settings = useSelector(state => state.settings)

	const handleChange = event => {
		setState({ ...state, [event.target.name]: event.target.value })
	}

	const handleSubmit = event => {
		event.preventDefault()
		const newClient = state
		if (newClient.balance === '') newClient.balance = 0

		edit(editClient(state.id, newClient, history))
	}

	useEffect(() => {
		if (isLoaded(data) && !isEmpty(data)) {
			const newData = {
				firstName: data.firstName !== undefined ? data.firstName : '',
				lastName: data.lastName !== undefined ? data.lastName : '',
				email: data.email !== undefined ? data.email : '',
				phoneNumber: data.phoneNumber !== undefined ? data.phoneNumber : '',
				balance: data.balance !== undefined ? data.balance : '',
                id:data.id
			}

			setState({ ...newData })
		}
	}, [data])

	//cleanup the component when going back to Client to not preserve this client for a second entry
	useEffect(() => {
		setState({})
	}, [history])

	let editForm

	!state.id
		? (editForm = <Spinner />)
		: (editForm = (
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
								<div className='card-header'>Edit Client</div>
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
												defaultValue={state.firstName}
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
												defaultValue={state.lastName}
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
												defaultValue={state.email}
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
												defaultValue={state.phoneNumber}
												onChange={handleChange}
											/>
										</div>
										<div className='form-group'>
											<label htmlFor='balance' className='form-label'>
												Balance
											</label>
											<input
												disabled={settings.disableBalanceOnEdit}
												type='text'
												className={classNames('form-control', { 'is-invalid': errors.balance })}
												name='balance'
												defaultValue={state.balance}
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
		  ))

	return (<div>{editForm}</div>)
}

export default EditClient
