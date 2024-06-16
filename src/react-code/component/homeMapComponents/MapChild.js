import { useEffect, useRef, useState } from 'react'
import "./MapChild.css"
import Marker from './Marker';

const MapChild = ({ displayList }) => {

    const ref = useRef(null);
    const [map, setMap] = useState();

    // googleMapの初期位置
    let latNum = 0; // displayListに座標がない場合0
    let lngNum = 0; // displayListに座標がない場合0
    for( let item of displayList ){
        if( item.lat !== null ){
            // リストの一番上が対象
            latNum = item.lat
            lngNum = item.lng
            break;
        }
    }

    const map_default = {
        // List一番上を初期位置に設定
        center: {
        lat: latNum,
        lng: lngNum
        },
        zoom: 12
    }
    
    // googleMapのサイズ設定
    const viewStyle = {
        width: '90%',
        aspectRatio: '4 / 3',
    }

    useEffect(() => {
        if (ref.current && !map) {
        const option = {
            mapId: "ea174c4d313f31d1",
            center: map_default.center,
            zoom: map_default.zoom,
            zoomControl: true,
            mapTypeControl: false,
            scaleControl: true,
            streetViewControl: true,
            rotateControl: false,
            fullscreenControl: true
        };
        setMap(new window.google.maps.Map(ref.current, option));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [displayList]);

    return (
        <>
            <div className='googleMap' style={viewStyle} ref={ref}>
                <Marker map={map} displayList={displayList} />
            </div>
        </>
    );
}

export default MapChild;