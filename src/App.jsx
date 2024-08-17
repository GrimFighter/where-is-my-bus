// @ts-nocheck

import { Route, Routes } from 'react-router-dom';
import './App.css';

import Home from './home';
import BusList from './BusList';
import BusData from './BusData';
import Footer from './Footer';
import About from './About';
import { useNavigate } from "react-router";
function App ()
{
	const navigate = useNavigate();

	return (
		<div className='app'>
			<div className="header">
				<img src="/Designer-removebg-preview.png" alt="logo" onClick={ () => navigate( '/' ) } /> <p onClick={ () => navigate( '/' ) }>RouteRiot</p>
			</div>
			<div className="content" >
				<Routes >
					<Route exact path='/' element={ <Home /> } />
					<Route exact path='/search'>
						<Route path='route/:src/:dest' element={ <BusList /> } />
						<Route path='businfo/:busno/:src/:dest' element={ <BusData /> } />
						<Route path='businfo/:busno' element={ <BusData /> } />
					</Route>
					<Route exact path='/about' element={ <About /> } />

				</Routes>
			</div>
			<Footer />
		</div>


	);
}

export default App;
