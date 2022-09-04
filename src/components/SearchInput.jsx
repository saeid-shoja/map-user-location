import React from "react";
import { OutlinedInput, Button } from "@mui/material";
import style from "./search.module.css";

const SearchInput = (props) => {
  return (
    <div className={style.searchBox}>
      <OutlinedInput className={style.searchInput} />
      <Button variant="contained" type="primary">
        search
      </Button>
    </div>
  );
};

export default SearchInput;
