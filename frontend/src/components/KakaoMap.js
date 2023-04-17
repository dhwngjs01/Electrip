import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

import Map from "./Map";

const KakaoMap = (props) => {
  const [position, setPosition] = useState({ la: null, ma: null });

  /* navigator.geolocation.getCurrentPosition(function (pos) {
    let la = pos.coords.latitude;
    let mg = pos.coords.longitude;

    setPosition({ la, mg });
  }); */

  return (
    <Paper
      elevation={16}
      sx={{
        position: "relative",
      }}
    >
      <Map zoneList={props.zoneList} />
      <Paper
        className="searchAddressForm"
        component="form"
        sx={{
          zIndex: 1,
          position: "absolute",
          top: 25,
          right: 25,
          display: "flex",
          alignItems: "center",
          width: 400,
          pl: 2,
          border: "1px solid #333",
          borderRadius: 10,
        }}
      >
        <InputBase
          name="keyword"
          sx={{ ml: 1, flex: 1 }}
          placeholder="주소를 입력하세요."
          required
        />
        <IconButton type="submit" sx={{ p: "10px" }}>
          <SearchIcon />
        </IconButton>
      </Paper>
    </Paper>
  );
};
export default KakaoMap;
