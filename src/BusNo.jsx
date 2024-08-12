// @ts-nocheck
import { useEffect, useState } from "react";
import busData from "./BusData-Kolkata.json";
import "./busno.css";
import InputBusNo from "./InputBusNo";
import { useNavigate } from "react-router";
import DirectionsBusFilledIcon from '@mui/icons-material/DirectionsBusFilled';

function BusNo ()
{
    const [ busNo, setBusNo ] = useState( '' );
    const [ busNoH, setBusNoH ] = useState( [] );


    const busNames = () =>
    {
        let arr = new Set();

        busData.forEach( ( busNames ) =>
        {
            if ( busNames.busNo ) arr.add( busNames.busNo );
        } );

        return arr;
    };

    const handleChange = ( e ) =>
    {
        setBusNo( e.target.value.toUpperCase() );
    };

    const navigate = useNavigate();

    const handleSubmit = ( e ) =>
    {
        e.preventDefault();
        setLocalItem();
        const busno_ = busNo.replace( "/", "_" );
        // console.log( temp );
        navigate( `/search/businfo/${ busno_ }` );

    };

    function setLocalItem ()
    {
        let local_items = localStorage.getItem( "busNoList" )?.split( "," ) || [];

        // Remove source and destination if they exist in the array
        removeItem( local_items, busNo );

        // Add the source and destination to the beginning of the array
        local_items.unshift( busNo );

        // If the array length exceeds 6, remove the oldest searches (from the end)
        while ( local_items.length > 6 )
        {
            local_items.pop();
        }

        // Store the updated list back in localStorage
        localStorage.setItem( "busNoList", local_items.toString() );

        function removeItem ( arr, value )
        {
            const index = arr.indexOf( value );
            if ( index > -1 )
            {
                arr.splice( index, 1 );
            }
            return arr;
        }

        let recentSearches = JSON.parse( localStorage.getItem( "busnoHistory" ) ) || [];

        // Create a new search object
        const newSearch = {
            busno: busNo
        };

        // Remove any previous occurrence of the same search
        recentSearches = recentSearches.filter(
            ( search ) =>
                search.busno !== busNo
        );

        // Add the new search to the beginning of the array
        recentSearches.unshift( newSearch );

        // Keep only the last 3 searches
        if ( recentSearches.length > 3 )
        {
            recentSearches.pop();
        }

        // Store the updated searches in localStorage
        localStorage.setItem( "busnoHistory", JSON.stringify( recentSearches ) );
    }
    function handleHistory ()
    {


        const recentSearches = JSON.parse( localStorage.getItem( "busnoHistory" ) ) || [];

        // Set the recent searches to the state
        setBusNoH( recentSearches );


    }

    useEffect( () =>
    {
        handleHistory(); // Load the history on component mount
    }, [] );


    return (
        <>
            <form className="form" onSubmit={ handleSubmit }>
                <InputBusNo label={ 'Enter Bus No' }
                    sugArr={ busNames() }
                    value={ busNo }
                    name={ 'busno' }
                    onChange={ handleChange }
                    autoComplete={ 'off' }
                    updateValue={ ( e ) => setBusNo( e ) }
                    required />

                <button type="submit">Search</button>
            </form>

            {busNoH.length > 0 && <div className="history_bus">
                <p>Recent Searches</p>
                <div className="history_list_bus">
                    { busNoH?.map( ( item, index ) =>
                    {
                        let tmp = item.busno.replace( "/", "_" );
                        return (
                            <p className="hl_item_bus" key={ index } onClick={ () => navigate( `/search/businfo/${ tmp }` ) }>
                                <DirectionsBusFilledIcon/> { item.busno }
                            </p>
                        );
                    } ) }
                </div>
            </div>}
        </>
    );

}

export default BusNo;