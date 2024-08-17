// @ts-nocheck
import { useParams } from "react-router";
import busData from "./BusData-Kolkata.json";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import "./busdata.css";

export default function BusData ()
{
    let { busno, src, dest } = useParams();

    const busNO = busno.replace( "_", "/" );


    function handleBusSearch ()
    {
        let res = [];

        busData.forEach( e =>
        {
            // Convert the 'via' array elements to lowercase for comparison
            const lcaseVia = e.via.map( a => a.toLowerCase() );

            const sourceIndex = lcaseVia?.indexOf( src );
            const destinationIndex = lcaseVia?.indexOf( dest );

            if ( e.busRouteName === busNO ||
                ( e.busNo === busNO && ( sourceIndex !== -1 && destinationIndex !== -1 && sourceIndex < destinationIndex ) )
                || ( e.busNo === busNO && ( !src && !dest ) ) )
            {
                res.push( {
                    busNo: e.busNo,
                    busRouteName: e.busRouteName,
                    route: {
                        from: e.route.from,
                        to: e.route.to
                    },
                    via: e.via
                } );
            }
        } );

        return res;

        // let res = [];

        // busData.forEach( ( e ) =>
        // {
        //     if ( e.busNo === busNO || e.busRouteName === busNO )
        //     {
        //         res.push( e );
        //     }
        // } );
        // return res;
    }

    var flag = false;
    return (
        <div className="bus_list">


            { handleBusSearch( busNO ).map( ( e, i ) =>
            {

                return (
                    <div className="bus_row" key={ i }>
                        <p className="bus_row_item">{ e.busNo || e.busRouteName }</p>
                        <p className="bus_row_item_spl"> { e.route.from } <ArrowForwardIcon /> { e.route.to }</p>

                        <div className={ `via_con ${ src && dest && 'hide' } ` }>
                            { src && dest ?
                                <label style={{ padding:'0px 0px 0px 135px'}}> Expand
                                    <input type="checkbox" className="checkbox" style={ { display: 'none' ,} } />
                                </label>
                                :
                                <input type="checkbox" style={ { display: 'none' } } />
                            }

                            { e.via.map( ( a, j ) =>
{
                                if ( a.toLowerCase() === src ) flag = true;
                                if ( a.toLowerCase() === dest ) flag = false;
                                return (
                                    <div className={ `via ${ flag ? 'show' : 'hide' } ${ a.toLowerCase() == src ? 's' : ( a.toLowerCase() == dest ? 'd' : '' ) }` } key={ `${ i }-${ j }` }>
                                        <div className="dot" />
                                        <p>{ a }</p>
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