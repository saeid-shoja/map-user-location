import React, { useState } from "react";
import "./App.css";
import Maps from "./components/Maps";
import SearchInput from "./components/SearchInput";

function App() {
  const [selectedLocation, setSelectedLocation] = useState();

  return (
    <div className="App">
      <div className="mapWrapper">
        <Maps selectedLocation={selectedLocation} />
      </div>
      <div className="searchWrapper">
        <SearchInput
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
        />
      </div>
    </div>
  );
}

export default App;
