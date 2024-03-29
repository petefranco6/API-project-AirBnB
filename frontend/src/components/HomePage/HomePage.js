import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as spotsActions from "../../store/spots";
import SpotItem from "../SpotItem.js/SpotItem";
import classes from "./HomePage.module.css";

const HomePage = () => {
  const dispatch = useDispatch();
  const allSpots = useSelector((state) => state.spots.spots);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(spotsActions.getAllSpots())
      .then(setIsLoading(false));
  }, [dispatch]);

  if (!isLoading) {
    return (
      <div className={classes.container}>
        {allSpots.map((spot) => (
          <SpotItem key={spot.id} details={spot} />
        ))}
      </div>
    );
  }
};

export default HomePage;
