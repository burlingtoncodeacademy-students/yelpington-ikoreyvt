// eslint-disable-next-line no-unused-vars
import { Link } from "react-router-dom";
import Map from "./Map";
import "../App.css";
// take in all restaurant info from props
const Restaurants = ({ restaurants }) => {
  return (
    <div id="allContainer">
      {/* provide info to map for the markers and positioning/zoom of map */}
      <Map restInfo={restaurants} center={[44.199, -72.49999]} zoom={15} />
      <div id="restaurants">
        {/* make sure we have restaurant info */}
        {restaurants ? (
          // if we have info to use map over each item to use relevant info
          restaurants.map((rest, index) => (
            // set the link of each item to link to their own id
            <Link to={`/restaurant/${rest.id}`}>
              <div className="restaurantListItem" key={index}>
                {/* provide the restaurant name to the list */}
                <p>{rest.name}</p>
              </div>
            </Link>
          ))
        ) : (
          // if no restaurant info, loading...
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Restaurants;
