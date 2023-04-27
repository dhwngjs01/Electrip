import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import ElectricCar from "/public/resources/svg/ElectricCar";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Button from "@mui/material/Button";

export default function ReserveInfo(props) {
  return (
    <Grid
      sm={4}
      sx={{
        maxHeight: "inherit",
        backgroundColor: "primary.main",
        position: "relative",
      }}
    >
      <Box p={3}>
        <Typography
          variant="h6"
          sx={{
            color: "primary.contrastText",
            borderBottom: "1px solid #e0e0e0",
            pb: 1,
            mb: 2,
          }}
        >
          <LocationOnIcon
            sx={{
              verticalAlign: "middle",
              fontSize: "2rem",
              pr: 1,
            }}
          />
          차량 대여 장소
        </Typography>
        <Typography
          sx={{
            color: "primary.contrastText",
            mb: 4,
          }}
        >
          {props.reserveZone}
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: "primary.contrastText",
            borderBottom: "1px solid #e0e0e0",
            pb: 1,
            mb: 2,
          }}
        >
          <ElectricCar
            sx={{
              verticalAlign: "middle",
              fontSize: "2.5rem",
              pr: 1,
            }}
          />
          차량 선택
        </Typography>
        <Typography
          sx={{
            color: "primary.contrastText",
          }}
        >
          {props.selectedCarName}
        </Typography>
      </Box>
      <Button
        fullWidth
        variant="contained"
        size="large"
        sx={{
          fontSize: "1.2rem",
          backgroundColor: "#333",
          color: "#fff",
          "&:hover": { backgroundColor: "#111", color: "#fff" },
          borderRadius: 0,
          position: "absolute",
          left: 0,
          bottom: 0,
        }}
      >
        다음
      </Button>
    </Grid>
  );
}
