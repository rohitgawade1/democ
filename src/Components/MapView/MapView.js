import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup as Pop, FeatureGroup, Polyline } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css"
import moment from "moment";
import { useAuthState } from "../../Helper/Context";
import { Loading } from "../../Helper/Loading";
import Popup from 'reactjs-popup'
import pin from './pin.png'


const StartMarker = new L.Icon({
    iconUrl: pin,
    iconSize: [40, 40],
    iconAnchor: [20, 41],
    popupAnchor: [2, -40]
});

const customMarker = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40]
});

const logo = "./logo-01.png"
const CurrentLocationMarker = new L.Icon({
    // iconUrl: "https://gayatrierp.in/assets/img/GME%20LOGO.jpg",
    iconUrl: logo,
    iconSize: [41, 41],
    iconAnchor: [20, 41],
    popupAnchor: [2, -40]
});

const MapView = (props) => {
    const { handleCloseMap, ShowMap, LoactionData, currEmployeeName } = props

    const userDetails = useAuthState();
    const { username } = userDetails

    const [Loader, setLoading] = useState(false)


    const markerData = [
        [18.50, 73.11],
        [18.709314735041126, 73.24093007633333],
        [18.326834494919822, 73.01220830472941],
        [18.746092403058576, 72.89410528292431],
        [18.57695068266547, 73.19897587409558]
    ]


    let geometries = [];

    LoactionData.forEach(item => {
        geometries = [...geometries, [item.latitude, item.longitude]];
    });


    const LoactionDataLength = LoactionData ? LoactionData.length - 1 : 0

    return (
        <>
            <Popup className='assigns' open={ShowMap} closeOnDocumentClick={false} onClose={handleCloseMap}
                contentStyle={{ overflowY: 'auto', overflowX: 'auto', height: '95vh' }}
            >
                <span className="close" onClick={handleCloseMap}>
                    &times;
                </span>
                <div className="call">Track Location</div>
                <div className="modal-body" >


                    {
                        Loader ? <Loading />
                            :
                            <MapContainer
                                center={[LoactionData && LoactionData[0].latitude, LoactionData && LoactionData[0].longitude]}
                                zoom={13}
                                style={{ height: "80vh" }}
                            >
                                <TileLayer
                                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
                                />

                                {/* <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                /> */}

                                <FeatureGroup>

                                    <Marker
                                        position={[LoactionData[LoactionDataLength].latitude, LoactionData[LoactionDataLength].longitude]}
                                        icon={StartMarker} title="Start Point">
                                        <Pop>
                                            Start Point
                                        </Pop>
                                    </Marker>


                                    {
                                        LoactionData && LoactionData.length > 0 ? LoactionData.map(({ latitude, longitude, visitPhoto,trackDate,trackTime,locationName }, index) => {
                                            return (
                                                <>
                                                    {
                                                        visitPhoto !== '' &&
                                                        <Marker position={[latitude, longitude]} icon={CurrentLocationMarker} key={index} title="Visit">
                                                            <Pop>
                                                                {/* Latitude= {latitude} and Longitude= {longitude} */}
                                                                <div className='marker-popup'>
                                                                    {/* <p>	Latitude: <span>{latitude ? latitude : "-"}</span></p>
                                                                    <p>	Longitude: <span>{longitude ? longitude : "-"}</span></p> */}
                                                                    <p>	Location Name : <b>{locationName ? locationName : "-"}</b></p>
                                                                    <p>	Date: <b>{trackDate ? moment(trackDate).format('DD/MM/YYYY') : "-"}</b></p>
                                                                    <p>	Time: <b>{trackTime ? trackTime : "-"}</b></p>
                                                                    <p>	Visit Photo: <p><img className='marker-popup-image' src={visitPhoto} /></p>
                                                                    </p>
                                                                </div>
                                                            </Pop>
                                                        </Marker>
                                                    }
                                                </>
                                            )
                                        })
                                            : ''
                                    }


                                    <Marker position={[LoactionData[0].latitude, LoactionData[0].longitude]} icon={customMarker} title={`Current Location of ${currEmployeeName}`}>
                                        <Pop>
                                            Current Location of <b>{currEmployeeName}</b>
                                        </Pop>
                                    </Marker>



                                    <Polyline positions={[geometries]} color={'blue'} />


                                </FeatureGroup>

                                {/* {LoactionData.map(({ latitude, longitude }, index) => {
                                    console.log([latitude, longitude])
                                    return (
                                        <Polyline positions={[latitude, longitude]} color="red" key={index} />
                                    )
                                })} */}

                            </MapContainer>
                    }

                </div>
            </Popup>
        </>
    );
}


export default MapView;
