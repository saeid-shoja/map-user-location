import React, { useState } from "react";
import style from "./styles/search.module.css";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Button from "@material-ui/core/Button";
import MyLocationIcon from "@material-ui/icons/MyLocation";
import Divider from "@material-ui/core/Divider";
import CircularProgress from "@material-ui/core/CircularProgress";

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";

const SearchInput = ({ setSelectedLocation }) => {
  const [searchLocation, setSearchLocation] = useState("");
  const [locationList, setLocationList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearchLocation = (e) => {
    setSearchLocation(e.target.value);
  };

  const submitLocation = () => {
    setIsLoading(true);

    //  request param
    const params = {
      // q = <query>
      q: searchLocation,
      format: "json",
      detailAddress: 1,
      polygon_geojson: 0,
    };

    // query to string
    const queryString = new URLSearchParams(params).toString();

    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`${NOMINATIM_BASE_URL}${queryString}`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        setIsLoading(false);
        setLocationList(JSON.parse(result));
      })
      .catch((err) => {
        setIsLoading(false);
        console.log({ err: err });
      });

    setSearchLocation("");
  };

  return (
    <div>
      <div className={style.searchBox}>
        <div style={{ width: "80%" }}>
          <OutlinedInput
            className={style.searchInput}
            value={searchLocation}
            onChange={(e) => handleSearchLocation(e)}
            placeholder="Write your intended location"
          />
        </div>
        <div className={style.searchButton}>
          <Button variant="contained" color="primary" onClick={submitLocation}>
            Search
          </Button>
        </div>
      </div>
      <div>
        {isLoading ? (
          <CircularProgress
            data-testid="loading-spinner"
            style={{ margin: "40% 40%" }}
          />
        ) : (
          <List>
            {locationList?.map((location) => {
              return (
                <div data-testid="list-item-wrapper" key={location?.place_id}>
                  <ListItem
                    button
                    onClick={() => {
                      setSelectedLocation(location);
                    }}
                    data-testid="list-item"
                  >
                    <ListItemIcon>
                      <MyLocationIcon />
                    </ListItemIcon>
                    <ListItemText primary={location?.display_name} />
                  </ListItem>
                  <Divider />
                </div>
              );
            })}
          </List>
        )}
      </div>
    </div>
  );
};

export default SearchInput;
