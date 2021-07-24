export const addClient = (newClient, history) => {
	return (dispatch, getState, { getFirestore }) => {
		//validate data @todo

		const firestore = getFirestore()
		return firestore
			.collection('clients')
			.add(newClient)
			.then(() => {
				history.push('/')
			})
			.catch(err => {
				console.log(err)
			})
	}
}

export const updateBalance = (balance, id) => {
	return (dispatch, getState, { getFirestore }) => {
		const firestore = getFirestore()
		return firestore
			.collection('clients')
			.doc(id)
			.update({ balance })
			.catch(err => console.log(err))
	}
}

export const deleteClient = (id, history) => {
	return (dispatch, getState, { getFirestore }) => {
		const firestore = getFirestore()
		return firestore
			.collection('clients')
			.doc(id)
			.delete()
			.then(() => history.push('/'))
			.catch(err => console.log(err))
	}
}

export const editClient = (id, newClient, history) => {
	return (dispatch, getState, { getFirestore }) => {
		const firestore = getFirestore()
		return firestore
			.collection('clients')
			.doc(id)
			.update(newClient)
			.then(() => history.push('/'))
			.catch(err => console.log(err))
	}
}
