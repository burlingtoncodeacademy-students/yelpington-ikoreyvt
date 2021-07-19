import React from "react";
import { useState, useEffect } from "react";
import { Switch, Route, BrowserRouter, Link } from "react-router-dom";
import Restaurant from "./components/Restaurant";
import Restaurants from "./components/Restaurants";
import "./App.css";

function App() {
  // state to save all restaurant info
  const [restaurants, setRestaurants] = useState(null);
  // useEffect to fetch from api endpoint 
  useEffect(() => {
    // if statement to deter an infinite loop
    if (!restaurants) {
      fetch("/api")
        .then((res) => res.json())
        .then((obj) => {
          // store the json object in the restaurant data
          setRestaurants(obj);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BrowserRouter>
      <div id="pageContainer">
        <h1 id="pageTitle">
          {/* have persistent header to link back home */}
          <Link to="/">Yelpington</Link>
        </h1>
        <Switch>
          {/* set path for either viewing every restaurant on the home page or an individual restaurant */}
          <Route
            exact
            path="/"                    //pass through all restaurant data for use on map and list
            render={() => <Restaurants restaurants={restaurants} />}
          />
          <Route
            path="/restaurant/:restaurantId"
            // pull from the param with the set variable on the match object
            render={({ match }) => ( //provide restaurantId for fetch on individual page
              <Restaurant restId={match.params.restaurantId} />
            )}
          />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
