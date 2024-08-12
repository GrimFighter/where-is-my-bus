// @ts-nocheck
import './inputPlace.css';
import { useState } from 'react';
import NorthWestOutlinedIcon from '@mui/icons-material/NorthWestOutlined';
import TurnLeftOutlinedIcon from '@mui/icons-material/TurnLeftOutlined';
import HistoryIcon from '@mui/icons-material/History';
export default function InputPlace ( { label, sugArr, value, updateValue, ...props } )
{
    const [ suggestion, setSuggestion ] = useState( Array.from( sugArr ) );
    const filtered_array = suggestion.filter( ( item ) => item.includes( value ) );

    const local_array = localStorage.getItem( 'placeList' )?.split( ',' ).filter( ( item ) => item.includes( value ) && item );

    return (
        <div className="input_con">
            <label className='input_wrap'> { label }
                <input type="text" { ...props } value={ value }  />
            </label>
        


            <div className="suggestion">
                {
                    local_array?.map( ( e, i ) => (
                        <div key={ i + 10 } className='sug_row_local' onClick={ () => updateValue( local_array[ i ] ) }>
                            <p>{ e }</p>
                            <div className="sel" onClick={ () => updateValue( local_array[ i ] ) }>
                                <HistoryIcon fontSize='small' />
                            </div>
                        </div>
                    ) )
                }
                { value &&  !local_array?.includes( value ) && filtered_array?.filter( ( e) => !local_array?.includes(e) && !value.includes(e)).slice( 0,5).map((e,i)=>
                (
                    <div key={ i } className='sug_row' onClick={ () => updateValue( filtered_array[ i ] ) }>
                        <p>{ e }</p>
                        <div className="sel" onClick={ () => updateValue( filtered_array[ i ] ) }>
                            <NorthWestOutlinedIcon fontSize='small' />
                        </div>
                    </div>
                )
                ) }
            </div>

        </div>
    );
}