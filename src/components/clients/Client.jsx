import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useFirestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import {  updateBalance,deleteClient } from '../../store/actions/clientActions'
import Spinner from '../common/Spinner'
import classnames from 'classnames'

const Client = props => {
	
	useFirestoreConnect({ collection: 'clients', storeAs: 'client', doc: props.match.params.clientId })

	const [client, setClient] = useState({})
	const [showUpdate, setUpdate] = useState(false)
	const [updateAmount, setUpdateAmount] = useState('')
	const { history } = props

	const update = useDispatch(updateBalance)
	const del = useDispatch(deleteClient)

	const data = useSelector(state => state.firestore.ordered.client && state.firestore.ordered.client[0])


	useEffect(() => {
		if (isLoaded(data) && !isEmpty(data)) setClient(data)
	}, [data])

	//cleanup the component when going back to Clients to not preserve this client for a second entry
	useEffect(() => {
		setClient({})
	}, [history])

	const handleSubmit = event => {
		event.preventDefault()
		update(updateBalance(parseFloat(updateAmount), client.id))

	}

	let balanceForm
	//display depending on toggle
	if (showUpdate) {
		balanceForm = (
			<form onSubmit={handleSubmit}>
				<div className='input-group'>
					<input
						type='text'
						name='updateAmount'
						value={updateAmount}
						className='form-control'
						placeholder='Add New Balance'
						onChange={event => setUpdateAmount(event.target.value)}
					/>
					<div className='input-group-append'>
						<input type='submit' value='update' className='btn btn-outline-dark' />
					</div>
				</div>
			</form>
		)
	} else {
		balanceForm = <div></div>
	}

	if (Object.keys(client).length === 0) {
		return (
			<div>
				<Spinner />
			</div>
		)
	} else {
		return (
			<div>
				<div className='row'>
					<div className='col-md-6'>
						<Link to='/' className='btn btn-link'>
							<i className='fas fa-arrow-circle-left'>Back To Dashboard</i>
						</Link>
					</div>
					<div className='col-md-6'>
						<div className='btn-group float-end'>
							<Link to={`/clients/edit/${client.id}`} className='btn btn-dark'>
								Edit
							</Link>
							<button className='btn btn-danger' onClick={()=>{del(deleteClient(client.id,history))}}>Delete</button>
						</div>
					</div>
				</div>
				<hr />
				<div className='card mt-2'>
					<h3 className='card-header'>
						{client.firstName} {client.lastName}
					</h3>
					<div className='card-body'>
						<div className='row'>
							<div className='col-md-8 col-sm-6'>
								<h4>
									Client ID:{''} <span className='text-secondary'>{client.id}</span>
								</h4>
							</div>
							<div className='col-md-4 col-sm-6'>
								<h3 className='float-end'>
									Balance:
									<span
										className={classnames('m-2', {
											'text-danger': parseFloat(client.balance) > 0,
											'text-success': parseFloat(client.balance) <= 0,
										})}>
										${parseFloat(client.balance).toFixed(2)}
									</span>
									<small>
										<a href='#!' onClick={() => setUpdate(!showUpdate)}>
											<i className='far fa-edit text-dark'></i>{' '}
										</a>
									</small>
								</h3>
								{balanceForm}
							</div>
						</div>
						<hr />
						<ul className='list-group'>
							<li className='list-group-item'>Contact Email: {client.email}</li>
							<li className='list-group-item'>Contact Phone: {client.phone}</li>
						</ul>
					</div>
				</div>
			</div>
		)
	}
}

export default Client
