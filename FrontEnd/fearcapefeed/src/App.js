import React, { Component } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Login from './login';
import Signup from './signup';
import Dashboard from './dashboard';
import Volunteer from './volunteeres';
import Admin from './admin';
import GroupBoard from './groups';

// import Header from './Sections/header';


class App extends Component {
	render(){
		return (
			<>
			<Router>
			<Routes>
				<Route exact path='/' element={<Login />} />
				<Route path='/signup' element={<Signup/>} />
				<Route path='/dashboard' element={<Dashboard/>} />
				<Route path='/volunteeres' element={<Volunteer/>} />
				<Route path='/groups' element={<GroupBoard/>} />
        		<Route path='/admin' element={<Admin/>} />
			</Routes>
			</Router>
			</>
		  );
	}
  
}

export default App;
