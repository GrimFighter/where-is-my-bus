// @ts-nocheck
import { useParams } from "react-router";
import busData from "./BusData-Kolkata.json";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import "./busdata.css";

export default function BusData ()
{

    let { busno } = useParams();

    const busNO = busno.replace( "_", "/" );



    function handleBusSearch ()
    {
        let res = [];

        busData.forEach( ( e ) =>
        {
            if ( e.busNo === busNO )
            {
                res.push( e );
            }
        } );
        return res;
    }

    handleBusSearch( busNO );

    return (
        <div className="bus_list">
            

            { handleBusSearch( busNO ).map( ( e, i ) =>
            {
                
                return (
                    <div className="bus_row" key={ i }>
                        <p className="bus_row_item">{ e.busNo }</p>
                        <p className="bus_row_item_spl"> { e.route.from } <ArrowForwardIcon/> { e.route.to }</p>
                        
                        <div className="via_con">
                            { e.via.map( ( a, j ) =>
                            {
                                return (
                                    <div className="via" key={ `${ i }-${ j }` }>
                                        <p>{ a }{ j < e.via.length - 1 && " -> " }</p>
                                    </div>
                                );
                            } ) }
                        </div>
                    </div>
                );
            } ) }

        </div>
    );
}