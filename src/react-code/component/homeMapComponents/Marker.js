import { useState , useEffect, useRef } from 'react'

const Marker = ({ map , displayList }) => {

    const [ marker , setMarker] = useState([]);
    const markerRef = useRef();

    const createMarker = (position) => {
        // マーカーのデザイン変更
        const pinView = new window.google.maps.marker.PinView({
            scale: 1,
        });

        // マーカーの緯度経度を設定
        markerRef.current = new window.google.maps.marker.AdvancedMarkerView({
            map,
            position: position,
            content: pinView.element,
        });

        return markerRef.current;
    };

    useEffect(() => {
        displayList.map((item) => {
            if( item.lng !== null ){
                let initialMarker = createMarker({ lat: item.lat , lng: item.lng });
                setMarker([ ...marker  , initialMarker]);
            }
        })
    
        return () => {
            if (markerRef.current) {
                markerRef.current.setMap(null);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [map]);
    
    return null;
}

export default Marker