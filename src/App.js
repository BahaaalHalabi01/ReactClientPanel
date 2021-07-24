import './App.css'
//Import components
import AppNavbar from './components/layout/AppNavbar'
import Dashboard from './components/layout/Dashboard'
import AddClient from './components/clients/AddClient'
import Client from './components/clients/Client'
import EditClient from './components/clients/EditClient'
import Login from './components/auth/Login'
import PrivateRoute from './components/common/PrivateRoute'
import Settings from './components/settings/Settings'
import Register from './components/auth/Register'
//
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

function App() {
	return (
		<Router>
			<div className='App'>
				<AppNavbar />
				<div className='container'>
					<Switch>
						<PrivateRoute exact path='/' component={Dashboard} />
						<PrivateRoute exact path='/clients/add' component={AddClient} />
						<PrivateRoute exact path='/clients/:clientId' component={Client} />
						<PrivateRoute exact path='/clients/edit/:clientId' component={EditClient} />
						<PrivateRoute exact path='/settings' component={Settings} />
						<Route exact path='/register' component={Register} />
						<Route exact path='/login' component={Login} />
					</Switch>
				</div>
			</div>
		</Router>
	)
}

export default App
