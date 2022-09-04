import React from "react";
import "./App.css";
import Maps from "./components/Maps";
import SearchInput from "./components/SearchInput";

function App() {
  return (
    <div className="App">
      <div className="mapWrapper">
        <Maps />
      </div>
      <div className="searchWrapper">
        <SearchInput />
      </div>
    </div>
  );
}

export default App;
