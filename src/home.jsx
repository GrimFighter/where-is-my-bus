// @ts-nocheck
import { useEffect, useState } from "react";
import BusNO from "./BusNo";
import BusRoute from "./BusRoute";
import StyledRadio, { Radio } from "./component/StyledRadio";
import "./home.css";
import Footer from "./Footer";

export default function Home ()
{


	const [ mode, setMode ] = useState( true );

	const handleToggle = ( event ) =>
	{
		event.target.value === "route" ? setMode( true ) : setMode( false );
	};

	// console.log( mode );

	return (
		<>
			<div className="radio_con_con">
				<StyledRadio >
					<Radio name={ 'mode' } value={ 'route' } label={ 'Bus Route' } defaultChecked onChange={ handleToggle } />
					<Radio name={ 'mode' } value={ 'busno' } label={ 'Bus No' } onChange={ handleToggle } />
				</StyledRadio>
			</div>
			<>	{ mode ? <><BusRoute />  </> : <><BusNO />  </> }</>
			
		</>

	);
}
