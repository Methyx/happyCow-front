import { useState, useEffect } from "react";
import "../style/nearbyList.css";

// functions
import loadNearbyTab from "../functions/loadNearbyTab";

// components
import MiniRestaurant from "../components/MiniRestaurant";

const NearbyList = ({ nearbyIds, setModalLoginVisible, setUser }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    loadNearbyTab(nearbyIds, setData, setIsLoaded);
  }, [nearbyIds]);

  return (
    <div className="nearbyList">
      <h2>Nearby Listing :</h2>
      <div className="nearby-container">
        {isLoaded ? (
          <div>
            {data.map((item, index) => {
              return (
                <MiniRestaurant
                  key={item._id}
                  restaurant={item}
                  setModalLoginVisible={setModalLoginVisible}
                  setUser={setUser}
                  isDescription={false}
                  top={10}
                />
              );
            })}
          </div>
        ) : (
          <p> Searching Nearby ...</p>
        )}
      </div>
    </div>
  );
};

export default NearbyList;
