import React from 'react';
import { Wrapper } from "@googlemaps/react-wrapper";
import MapChild from "./MapChild";

const Map = ({ displayList }) => {

    return (
        <Wrapper apiKey={GoogleMapsAPIKEY} version='beta' libraries={['marker']}>
            <MapChild displayList={displayList} />
        </Wrapper>
    )
};

export default Map;