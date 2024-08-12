// @ts-nocheck

import { Route, Routes } from 'react-router-dom';
import './App.css';

import Home from './home';
import BusList from './BusList';
import BusData from './BusData';
function App ()
{
	return (
		<div className='app'>
			<div className="header">
			<img src="public/Designer-removebg-preview.png" alt="logo" />RouteRiot
			</div>
			<div className="content" >
				<Routes >
					<Route exact path='/' element={ <Home /> } />
					<Route exact path='/search'>
						<Route path='route/:src/:dest' element={ <BusList /> } />
						<Route path='businfo/:busno' element={ <BusData /> } />
					</Route>

				</Routes>
			</div>
		</div>
	);
}

export default App;
