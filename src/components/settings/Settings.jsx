import React from 'react'
import { Link } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import { setDisableBalanceOnAdd, setDisableBalanceOnEdit, allowRegistration } from '../../store/actions/settingsActions'

const Settings = () => {
	const settings = useSelector(state => state.settings)
	const disableAdd = useDispatch(setDisableBalanceOnAdd)
	const disableEdit = useDispatch(setDisableBalanceOnEdit)
	const allowReg = useDispatch(allowRegistration)

	const { disableBalanceOnAdd, disableBalanceOnEdit, setAllowRegistration } = settings

	return (
		<div>
			<div className='row'>
				<div className='col-md-6'>
					<Link to='/' className='btn btn-link text-decoration-none'>
						<i className='fas fa-arrow-circle-left'></i> Dashboard
					</Link>
				</div>
			</div>
			<div className='card'>
				<div className='card-header'>
					<div className='card-body'>
						<form onSubmit={() => {}}>
							<div className='form-group mb-2'>
								<label htmlFor='allowRegistration'>Allow Registration</label>{' '}
								<input type='checkbox' name='allowRegistration' checked={setAllowRegistration} onChange={() => allowReg(allowRegistration())} />
							</div>
							<div className='form-group mb-2'>
								<label htmlFor='disableBalanceOnAdd'>Disable Balance on Add</label>{' '}
								<input
									type='checkbox'
									name='disableBalanceOnAdd'
									checked={disableBalanceOnAdd}
									onChange={() => disableAdd(setDisableBalanceOnAdd())}
								/>
							</div>
							<div className='form-group mb-2'>
								<label htmlFor='disableBalanceOnEdit'>Disable Balance On Edit</label>{' '}
								<input
									type='checkbox'
									name='disableBalanceOnEdit'
									checked={disableBalanceOnEdit}
									onChange={() => disableEdit(setDisableBalanceOnEdit())}
								/>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Settings
