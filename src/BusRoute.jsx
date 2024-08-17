// @ts-nocheck
import { useEffect, useState } from "react";
import busData from "./BusData-Kolkata.json";
import "./busroute.css";
import InputPlace from "./InputPlace";
import { useNavigate } from "react-router";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
function BusRoute ()
{
	const [ formData, setformData ] = useState( {
		source: "",
		destination: "",
	} );

	const [ formDataH, setformDataH ] = useState( [] );

	const [ routeResult, setRouteResult ] = useState( [] );

	const navigate = useNavigate();

	const handelChange = ( e ) =>
	{
		setformData( {
			...formData,
			[ e.target.name ]: e.target.value.toLowerCase(),
		} );
	};

	const placeList = () =>
	{
		let arr = new Set();
		busData.forEach( ( data ) =>
		{
			data.via.forEach( ( via ) => arr.add( via.toLowerCase() ) );
		} );
		return arr;
	};

	const handleSubmit = ( event ) =>
	{
		event.preventDefault();
		setLocalItem();
		// handleRouteSearch(formData.source, formData.destination);
		navigate( `/search/route/${ formData.source }/${ formData.destination }` );
	};

	function setLocalItem ()
	{
		let local_items = localStorage.getItem( "placeList" )?.split( "," ) || [];

		// Remove source and destination if they exist in the array

		local_items = local_items.filter( ( item ) => item !== formData.source && item !== formData.destination );


		// Add the source and destination to the beginning of the array
		if ( formData.source !== formData.destination )
		{
			local_items.unshift( formData.source );
			local_items.unshift( formData.destination );
		} else
		{
			local_items.unshift( formData.source );


		}

		// If the array length exceeds 6, remove the oldest searches (from the end)
		while ( local_items.length > 6 )
		{
			local_items.pop();
		}

		// Store the updated list back in localStorage
		localStorage.setItem( "placeList", local_items.toString() );

		// function removeItem ( arr, value )
		// {
		// 	const index = arr.indexOf( value );
		// 	if ( index > -1 )
		// 	{
		// 		arr.splice( index, 1 );
		// 	}
		// 	return arr;
		// }

		let recentSearches = JSON.parse( localStorage.getItem( "routeHistory" ) ) || [];

		// Create a new search object
		const newSearch = {
			source: formData.source,
			destination: formData.destination
		};

		// Remove any previous occurrence of the same search
		recentSearches = recentSearches.filter(
			( search ) =>
				search.source !== formData.source || search.destination !== formData.destination
		);

		// Add the new search to the beginning of the array
		recentSearches.unshift( newSearch );

		// Keep only the last 3 searches
		if ( recentSearches.length > 3 )
		{
			recentSearches.pop();
		}

		// Store the updated searches in localStorage
		localStorage.setItem( "routeHistory", JSON.stringify( recentSearches ) );


	};

	function handleHistory ()
	{


		const recentSearches = JSON.parse( localStorage.getItem( "routeHistory" ) ) || [];

		// Set the recent searches to the state
		setformDataH( recentSearches );


	}

	useEffect( () =>
	{
		handleHistory(); // Load the history on component mount
	}, [] );

	return ( <>
		<form onSubmit={ handleSubmit } className="form">
			<InputPlace
				label={ "Source" }
				sugArr={ placeList() }
				value={ formData.source }
				name={ "source" }
				onChange={ handelChange }
				autoComplete="off"
				updateValue={ ( e ) => setformData( { ...formData, source: e } ) }
				required
			/>

			<InputPlace
				label={ "Destination" }
				sugArr={ placeList() }
				value={ formData.destination }
				name={ "destination" }
				onChange={ handelChange }
				autoComplete="off"
				updateValue={ ( e ) => setformData( { ...formData, destination: e } ) }
				required
			/>
			<button type="submit">Search</button>
		</form>

		{ formDataH.length > 0 && <div className="history">
			<p>Recent Searches</p>
			<div className="history_list">
				{ formDataH?.map( ( item, index ) => (

					<div className="hl_item" key={ index }
						onClick={ () => navigate( `/search/route/${ item.source }/${ item.destination }` ) }>

						{ item.source } <ArrowForwardIcon fontSize="small" /> { item.destination }
					</div>
				) ) }
			</div>
		</div> }
	</>
	);
}

export default BusRoute;