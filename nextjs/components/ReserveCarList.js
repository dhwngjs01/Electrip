import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { CardActionArea } from "@mui/material";
import Typography from "@mui/material/Typography";

export default function ReserveCarList(props) {
  const handleClickCar = (e) => {
    self = e.currentTarget;
    const carNo = self.dataset.carNo;
    const carName = self.dataset.carName;

    props.setSelectedCarNo(parseInt(carNo));
    props.setSelectedCarName(carName);
  };

  return (
    <Grid
      sm={8}
      sx={{
        maxHeight: "inherit",
        "& > .scrollbar": {
          overflowY: "scroll",
          "&::-webkit-scrollbar": {
            width: 10,
            WebkitAppearance: "none",
          },
          "&::-webkit-scrollbar-thumb": {
            borderRadius: 5,
            backgroundColor: "rgba(0 0 0 / 0.5)",
          },
        },
      }}
    >
      <Box
        className="scrollbar"
        sx={{
          boxSizing: "border-box",
          p: 2,
          maxHeight: "inherit",
        }}
      >
        <Grid container spacing={2}>
          {props.carList.map((car) => (
            <Grid
              key={car.car_no}
              sm={6}
              sx={{
                pb: 1,
              }}
            >
              <Card elevation={3}>
                <CardActionArea>
                  <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    className={
                      "car-card" +
                      (car.car_no === props.selectedCarNo
                        ? " selected-car"
                        : "")
                    }
                    p={3}
                    sx={{
                      height: "200px",
                      transition: "background-color 0.3s",
                      "&:hover": {
                        backgroundColor: "warning.main",
                      },
                      "&:hover .MuiTypography-root": {
                        color: "warning.contrastText",
                      },
                    }}
                    data-car-no={car.car_no}
                    data-car-name={car.car_name}
                    onClick={handleClickCar}
                  >
                    <Grid sm={6}>
                      <Box
                        component="img"
                        src={car.car_original_image}
                        title={car.car_name}
                        alt={car.car_name}
                        sx={{
                          maxWidth: "100%",
                        }}
                      />
                    </Grid>
                    <Grid
                      sm={6}
                      sx={{
                        textAlign: "right",
                      }}
                    >
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        style={{ wordBreak: "keep-all" }}
                      >
                        {car.car_name}
                      </Typography>
                      <Typography
                        variant="h5"
                        color="primary.main"
                        fontWeight="bold"
                      >
                        {car.car_price
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        원
                      </Typography>
                      <Typography variant="h6">{car.car_seat}인승</Typography>
                    </Grid>
                  </Grid>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Grid>
  );
}
