import Map from "./Map";
import { useState, useEffect } from "react";
import "../App.css";
// take the restaurantId from the match object provided above
function Restaurant({ restId }) {
  // declare state to hold restaurant info for later use
  const [restInfo, setRestInfo] = useState([]);
  // useEffect to fetch from the single restaurant api
  useEffect(() => {
    // check to make sure we aren't running into an infinite loop by not running fetch if we already have the info
    if (!restInfo.length) {
      fetch(`/api/${restId}`)
        .then((res) => res.json())
        .then((obj) => {
          // store restaurant info for later use
          setRestInfo([obj]);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {/* make sure there is info from the fetch */}
      {restInfo.length ? (
        <div id="allContainer">
          {/* if we have data provide required info for single restaurant map render */}
          <Map
            restInfo={restInfo}
            // center map on the restaurant
            center={[restInfo[0].lat, restInfo[0].long]}
            // zoom in a little bit more for single
            zoom={18}
          />
          <div id="restInfo">
            <div id="mainInfo">
              {/* section for displaying relevant info about restaurant */}
              <h1>{restInfo[0].name}</h1>
              <h3>{restInfo[0].address}</h3>
              <h3>{restInfo[0].phoneNumber}</h3>
              <h3>Hours: {restInfo[0].hours}</h3>
            </div>
            <div id="notes">
              {/* section for displaying all my notes about said restaurant */}
              Personal Notes:
              {restInfo[0].notes.map((note, index) => (
                <p key={index}>{note}</p>
              ))}
            </div>
          </div>
        </div>
      ) : (
        // if no restaurant info, loading...
        "Loading..."
      )}
    </div>
  );
}

export default Restaurant;
