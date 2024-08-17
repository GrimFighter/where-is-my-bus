// @ts-nocheck
import { useParams } from "react-router";
import busData from "./BusData-Kolkata.json";
import { Link } from "react-router-dom";
import "./buslist.css";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';


export default function BusList ()
{
    const { src, dest } = useParams();
    // console.log( src, dest );
    function handleRouteSearch ( source, destination )
    {
        let res = [];

        busData.forEach( e =>
        {
            // Convert the 'via' array elements to lowercase for comparison
            const lcaseVia = e.via.map( a => a.toLowerCase() );

            const sourceIndex = lcaseVia.indexOf( source );
            const destinationIndex = lcaseVia.indexOf( destination );

            if ( sourceIndex !== -1 && destinationIndex !== -1 && sourceIndex < destinationIndex )
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
    }

    return (
        <div className="bus_list">
            { handleRouteSearch( src, dest ).length > 0 ? (
                handleRouteSearch( src, dest ).map( ( e, i ) =>
                {
                    let tmp;
                    if ( e.busRouteName === null ) { tmp = e.busNo?.replace( "/", "_" ); } else { tmp = e.busRouteName; }
                    return (
                        <Link to={ `../businfo/${ tmp }/${src}/${dest}` } className="bus_row" key={ i }>
                            <p className="bus_row_item">{ e.busNo || e.busRouteName }</p>
                            <p className="bus_row_item_spl">{ e.route.from }
                                <ArrowForwardIcon fontSize="small" />
                                { e.route.to }</p>
                        </Link>
                    );
                } )
            ) : (
                <h1>No Route Found</h1>
            ) }
        </div>

    );
}