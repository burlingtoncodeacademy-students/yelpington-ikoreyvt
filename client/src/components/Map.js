import React from "react";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";
// set parameters on icon to get it to show up and in the right place
let defaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25,41],
  iconAnchor: [12, 41]
});
// pull in props to provide info to map dynamically
export default function Map({ restInfo, center, zoom }) {
  return (
    <div id="mapContainer">
      <MapContainer
      // set center and zoom from info taken from props on single/all restaurant pages
        center={center}
        zoom={zoom}
        // set map to a decent size
        style={{ height: "32rem", width: "32rem" }}
      >
        <TileLayer
        // provide the tile layer with proper url source and attribution
          url="https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png"
          attribution='<a href="https://github.com/cyclosm/cyclosm-cartocss-style/releases" title="CyclOSM - Open Bicycle render">CyclOSM</a> | Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* assure we have restaurant info before trying to loop over it */}
        {restInfo ? (
          // once we have the info, map over each item in the provided array for use in marker and tooltip/popup
          restInfo.map((rest, index) => (
            <Marker
              // set position for each marker with lat/long from provided object
              position={[rest.lat, rest.long]}
              icon={defaultIcon}
              key={index}
            >
              <Tooltip sticky>
                {/* give a little info to the hover over tooltip on each restaurant marker */}
                {rest.name}
                <br />
                {rest.address}
                <br />
                {rest.phoneNumber}
              </Tooltip>
              <Popup>
                {/* provide link to see more info if user clicks on marker */}
                <Link to={`/restaurant/${rest.id}`}>
                  {rest.name}
                  <br />
                  Click here to see more info!
                </Link>
              </Popup>
            </Marker>
          ))
        ) : (
          // if no restaurant info provided yet place default marker stating there was an error getting info
          <Marker position={center} icon={defaultIcon}>
            <Tooltip>There's been an error fetching info.</Tooltip>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}
