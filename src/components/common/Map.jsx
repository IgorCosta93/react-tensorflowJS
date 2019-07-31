import React from "react";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";


function Map(){
    return (
        <GoogleMap
            defaultZoom={10}
            defaultCenter={{ lat: -23.585976, lng: -47.482023 }}
            //ref={this.setRef}
            //onZoomChanged={this.getEmbargoes}
            //onDragEnd={this.getEmbargoes}
        >
            <Marker position={{ lat: -23.585976, lng: -47.482023 }} />
        </GoogleMap>
    );
}

const MyMap = withScriptjs(withGoogleMap(Map));

function Maps(){
    return (
        <MyMap
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%`, width: `98%` }} />}
        />
    );
}

export default Maps;
