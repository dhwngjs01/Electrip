import React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

import GpsFixedIcon from "@mui/icons-material/GpsFixed";

import Map from "./Map";

const KakaoMap = (props) => {
  return (
    <Paper
      elevation={16}
      sx={{
        position: "relative",
      }}
    >
      <GpsFixedIcon
        className="gpsIcon"
        sx={{
          zIndex: 3,
          position: "absolute",
          top: 25,
          left: 25,
          color: "#333",
          cursor: "pointer",
          fontSize: "2rem",
          backgroundColor: "#fff",
          borderRadius: 3,
          padding: 1,
          border: "1px solid #333",
          boxShadow: "0 0 7px #333",
          transition: "all 0.2s",
          "&:hover": {
            backgroundColor: "#0093c9",
            color: "#fff",
          },
        }}
      />
      <Paper
        className="searchAddressForm"
        component="form"
        sx={{
          zIndex: 2,
          position: "absolute",
          top: 25,
          right: 25,
          display: "flex",
          alignItems: "center",
          width: 400,
          pl: 2,
          border: "1px solid #333",
          borderRadius: 10,
          boxShadow: "0 0 7px #333",
        }}
      >
        <InputBase
          className="searchAddressInput"
          name="keyword"
          sx={{ ml: 1, flex: 1 }}
          placeholder="주소를 입력하세요."
          required
        />
        <IconButton type="submit" sx={{ p: "10px" }}>
          <SearchIcon />
        </IconButton>
      </Paper>
      <Map zoneList={props.zoneList} />
    </Paper>
  );
};
export default KakaoMap;
