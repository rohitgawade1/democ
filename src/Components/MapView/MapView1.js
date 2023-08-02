
import { MapContainer, TileLayer, Marker, Popup, GeoJSON, FeatureGroup, Polyline, } from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import L from 'leaflet';
import { useEffect, useState } from 'react';
import { BaseUrl } from '../../Helper/BaseUrl';
// import { customMarker } from './customMarker';

const pin = "https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png";

const MapView1 = () => {
    const pinMB = L.icon({
        iconUrl: pin,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
        shadowUrl: null,
        shadowSize: null,
        shadowAnchor: null
    });
    const markerData = [
        [18.50, 73.11],
        [18.709314735041126, 73.24093007633333],
        [18.326834494919822, 73.01220830472941],
        [18.746092403058576, 72.89410528292431],
        [18.57695068266547, 73.19897587409558]
    ]

    const [LoactionData, setLoactionData] = useState([])

    useEffect(() => {
        getLocationData()
    } , [])

    const getLocationData = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer ");
        
        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };
          
          fetch(`${BaseUrl}/Master/Get_APK_M_Employee_WiseVisitLiveTracking_Select?M_Employee_AttendanceID=45&M_EmployeeID=83&MobileNumber=&M_UserID=24&Flag=Track&Top=0`, requestOptions)
            .then(response => response.json())
            .then(result => 
                setLoactionData(result.data.table)
                )
            .catch(error => console.log('error', error));
    }
    return (
        <>
            <div className="content" id='dash'>
                <div className="heading-button-container">

                    <h5 className="master-heading">
                        Track Location
                        {/* <span className="sub-heading-dashboard">{screenHeading}</span> */}
                    </h5>
                </div>
                <div className='container-row'>

                    <MapContainer
                        center={LoactionData && LoactionData[0]}
                        zoom={12}
                        scrollWheelZoom={true}
                        style={{ height: "100vh", zIndex: 0 }}
                    >
                        {/* <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            /> */}

                        <FeatureGroup>
                            {/* {markerData?.map((mark, i) => (
                                // <Marker key={i} position={mark} icon={pinMB} />
                                <Marker
                                    key={i}
                                    position={mark}
                                    icon={customMarker}
                                ></Marker>
                            ))} */}

                            <Polyline positions={LoactionData} color="red" />
                        </FeatureGroup>

                        <TileLayer
                            // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
                            subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
                        />
                        {/* <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
            />  */}
                        {LoactionData.map((item, index) => (
                            <Marker
                                key={index}
                                position={[item.latitude, item.longitude]}
                                icon={pinMB}
                            >
                                <Popup>
                                    <div className='marker-popup'>
                                        <p>GME</p>
                                        <img src={require('./GME.jpg')} style={{ width: '200px' }} />
                                    </div>
                                </Popup>
                            </Marker>
                        ))}

                    </MapContainer>

                </div>
            </div>
        </>
    )
}

export default MapView1