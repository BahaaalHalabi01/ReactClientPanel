import React from 'react'
import { Link } from 'react-router-dom'

const SideBar = () => {
	return (
        <div>
          
		<Link to='/clients/add' className='btn btn-success btn-block' >
			<i className='fas fa-plus'/> New Client
		</Link>
     
        </div>
	)
}

export default SideBar
