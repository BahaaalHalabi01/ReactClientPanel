import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useFirestoreConnect, isEmpty, isLoaded } from 'react-redux-firebase'
import Spinner from '../common/Spinner'

const Clients = () => {
	useFirestoreConnect(['clients'])

	const data = useSelector(state => state.firestore.ordered.clients)
	const [totalOwed, setTotal] = useState(null)
	const [clients, setClients] = useState([])

	useEffect(() => {
		const getTotal = () => {
			let total = 0
			if (data.length > 0) data.forEach(client => (total = total + parseFloat(client.balance.toString())))
			return total
		}

		if (isLoaded(data) && !isEmpty(data)) {
			setClients(data)
			setTotal(getTotal())
		}
	}, [data])

	if (clients.length !== 0) {
		return (
			<div>
				<div className='row'>
					<div className='col-md-6'>
						<h2>
							<i className='fas fa-users' /> Clients
						</h2>
					</div>
					<div className='col-md-6'>
						<h5 className='text-end text-secondary '>
							Total Owed <span className='text-primary'>${parseFloat(totalOwed).toFixed(2)}</span>
						</h5>
					</div>
				</div>

				<table className='table table-striped'>
					<thead className='thead-inverse'>
						<tr>
							<th>Name</th>
							<th>Email</th>
							<th>Balance</th>
							<th />
						</tr>
					</thead>
					<tbody>
						{clients.map(client => (
							<tr key={client.id}>
								<td>
									{client.firstName} {client.lastName}
								</td>
								<td>{client.email}</td>
								<td>${parseFloat(client.balance).toFixed(2)}</td>
								<td>
									<Link to={`/clients/${client.id}`} className='btn btn-secondary btn-sm'>
										<i className='fas fa-arrow-circle-right'> Details</i>
									</Link>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		)
	} else {
		return <Spinner />
	}
}

export default Clients
